import { BACKSPACE, ESC, PROMPT_PLAY, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_SURRENDER, RETURN, SPACE, STACK_CAPACITY, START_PAGE, TICK_MS } from './const';
import { clientRect } from './utils';

export const _sob = $state({
    sounds: true,
    page: START_PAGE,
    game_on: false,
    over: false,
    input: [],
    input_solved: false,
    letter_box_size: 0,
    task_pool: [],
    task: null,
    ticks: 0,
    timer: null,
    max_travel_ms: 14000,
});

export const _prompt = $state({
    id: PROMPT_PLAY,
    opacity: 1
});

export const _stack = $state({
    tasks: [],
    top: () => _stack.tasks.at(0),
});

export const calcDrop = (props = {}) => {
    const { surrendering, onHitBottom } = props;

    if (!_sob.letter_box_size) {
        return 0;
    }
    const height = clientRect('.well').height;

    const rowPx = _sob.letter_box_size;
    const stackPx = _stack.tasks.length * rowPx;
    const travelPx = height - stackPx;

    if (travelPx <= 0) {
        return 0;
    }

    if (surrendering) {
        return travelPx - rowPx;
    }

    const travelMs = _sob.max_travel_ms * (travelPx / height);
    const deltaPx = (travelPx / travelMs) * TICK_MS;
    const px = _sob.ticks * deltaPx - rowPx;

    if (onHitBottom && px + rowPx >= travelPx) {
        onHitBottom();
    }

    return px;
};

export const onOver = () => {
    killTimer();
    clearInput();

    _sob.ticks = 0;
    _sob.task = null;

    setTimeout(() => {
        _sob.over = true;

        setTimeout(() => {
            _prompt.id = PROMPT_PLAY_AGAIN;
            _prompt.opacity = 1;
        }, 1000);
    }, 1000);
};

export const addToStack = () => {
    _stack.tasks.unshift(_sob.task);
};

export const startTimer = () => {
    _sob.timer = setInterval(() => {
        _sob.ticks += 1;

        const onHitBottom = () => {
            addToStack();

            if (_stack.tasks.length < STACK_CAPACITY) {
                nextTask();
            } else {
                onOver();
            }
        };

        calcDrop({ onHitBottom });
    }, TICK_MS);
};

export const killTimer = () => {
    clearInterval(_sob.timer);
    _sob.timer = null;
};

export const nextTask = ({ delay = 0 } = {}) => {
    killTimer();

    _sob.ticks = 0;
    _sob.task = _sob.task_pool.pop();

    setTimeout(() => {
        startTimer();
        _sob.game_on = true;
    }, delay);
};

const clearInput = () => {
    _sob.input_solved = true;

    setTimeout(() => {
        _sob.input = [];
        setTimeout(() => _sob.input_solved = false, 300);
    }, 300);
};

export const onKeyInput = (ch) => {
    const unprompt = () => {
        if (_prompt.id === PROMPT_SURRENDER || _prompt.id === PROMPT_RESET_STATS) {
            _prompt.opacity = 0;
        }
    };

    if (ch === ESC) {
        unprompt();
        return;
    }

    if (ch === RETURN) {
        // TODO
        return;
    }

    if (_sob.ticks === 0) {
        return;
    }

    unprompt();

    if (ch === SPACE) {
        _sob.input = [];
        return;
    }

    if (ch === BACKSPACE) {
        _sob.input.pop();
        return;
    }

    if (_sob.input_solved) {
        _sob.input = [];
    }

    if (_sob.input.length === 5) {
        return;
    }

    _sob.input.push(ch);
    const word = _sob.input.join('');

    if (_sob.task.word === word) {
        killTimer();
        _sob.task.solved = true;
        clearInput();
    } else if (_stack.top()?.word === word) {
        clearInput();
        _stack.tasks.shift();
    }
};
