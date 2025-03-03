/* eslint-disable no-undef */
import { PROMPT_PLAY, START_PAGE, TICK_MS } from './const';
import { clientRect } from './utils';

export const _sob = $state({
    sounds: true,
    page: START_PAGE,
    game_on: false,
    over: false,
    input: [],
    letter_box_size: 0,
    task_pool: [],
    task: null,
    ticks: 0,
    timer: null,
    max_travel_ms: 14000,
    solved: false
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
    const { onOver, onDropped } = props;

    if (!_sob.letter_box_size) {
        return 0;
    }
    const height = clientRect('.well').height;

    const rowPx = _sob.letter_box_size;
    const stackPx = _stack.tasks.length * rowPx;
    const travelPx = height - stackPx;

    if (onOver && travelPx <= 0) {
        onOver();
        return;
    }

    const travelMs = _sob.max_travel_ms * (travelPx / height);
    const deltaPx = (travelPx / travelMs) * TICK_MS;
    const px = _sob.ticks * deltaPx - rowPx;

    if (onDropped && px + rowPx >= travelPx) {
        onDropped();
    }

    return px;
};

export const startTimer = () => {
    _sob.timer = setInterval(() => {
        _sob.ticks += 1;

        const onOver = () => {
            killTimer();

            _sob.over = true;
            _sob.game_on = false;

            _prompt.id = PROMPT_PLAY_AGAIN;
            _prompt.opacity = 1;

            _sob.task = null;
            _sob.ticks = 0;
        };

        calcDrop({ onOver, onDropped: nextTask });
    }, TICK_MS);
};

export const killTimer = () => {
    clearInterval(_sob.timer);
    _sob.timer = null;
};

export const nextTask = () => {
    killTimer();

    _sob.ticks = 0;
    _sob.task = _sob.task_pool.pop();

    startTimer();
};

export const onCharIniput = (ch) => {
    _sob.input.push(ch);
    const word = _sob.input.join('');

    const clearInput = () => {
        _sob.solved = true;

        setTimeout(() => {
            _sob.input = [];
            setTimeout(() => _sob.solved = false, 500);
        }, 500);
    };

    if (_sob.task?.solution === word) {
        killTimer();
        _sob.task.solved = true;
        clearInput();
    } else if (_stack.top()?.solution === word) {
        clearInput();
        _stack.tasks.shift(_sob.task);
    }
};
