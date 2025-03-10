import { dict4 } from '$lib/dicts/dict4';
import { dict5 } from '$lib/dicts/dict5';
import { shuffle } from 'lodash-es';
import { BACKSPACE, ESC, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_START, PROMPT_SURRENDER, RETURN, SPACE, STACK_CAPACITY, START_PAGE, TICK_MS } from './const';
import { playSound } from './sound.svelte';
import { clientRect, later } from './utils';

export const _sob = $state({
    page: START_PAGE,
    input: [],
    task_pool: [],
    max_travel_ms: 5000,
    lookup_prompt: true,
});

export const _prompt = $state({
    id: PROMPT_START,
    opacity: 1
});

export const _stack = $state({
    tasks: [],
    top: () => _stack.tasks.at(0),
});

export const calcDrop = (props = {}) => {
    const { surrendering, onHitBottom } = props;

    if (!_sob.tile_sz) {
        return 0;
    }
    const wellHi = clientRect('.well').height;

    const rowHi = _sob.tile_sz;
    const stackHi = _stack.tasks.length * rowHi;
    const travelHi = wellHi - stackHi;

    if (travelHi <= 0) {
        return 0;
    }

    if (surrendering) {
        return travelHi - rowHi;
    }

    const travelMs = _sob.max_travel_ms * (travelHi / wellHi);
    const deltaPx = (travelHi / travelMs) * TICK_MS;
    const hi = _sob.ticks * deltaPx;

    if (onHitBottom && hi >= travelHi) {
        onHitBottom();
    }

    return hi - rowHi;
};

const onOver = () => {
    killTimer();
    clearInput();

    _sob.ticks = 0;
    _sob.task = null;

    later(() => {
        playSound('won');
        _sob.over = true;

        later(() => {
            _prompt.id = PROMPT_PLAY_AGAIN;
            _prompt.opacity = 1;
        }, 1000);
    }, 1000);
};

const addToStack = () => {
    _stack.tasks.unshift(_sob.task);
};

const startTimer = () => {
    _sob.timer = setInterval(() => {
        _sob.ticks += 1;

        const onHitBottom = () => {
            playSound('drop', { rate: 3 });
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

    later(() => {
        startTimer();
        _sob.game_on = true;
    }, delay);
};

const clearInput = () => {
    _sob.input_solved = true;

    later(() => {
        _sob.input = [];
        later(() => _sob.input_solved = false, 300);
    }, 300);
};

export const keyDisabled = (ch) => {
    if (!_sob.ticks) {
        return true;
    }

    if (ch === SPACE || ch === BACKSPACE) {
        return _sob.input.length === 0;
    }

    const chars = [..._sob.task.word];

    if (_stack.tasks.length) {
        chars.push(..._stack.tasks[0].word);
    }
    if (!chars.includes(ch)) {
        return true;
    }

    return false;
};

export const onKeyInput = (ch) => {
    const unprompt = () => {
        const id = _prompt.id;

        if (id === PROMPT_START || id === PROMPT_PLAY_AGAIN || id === PROMPT_SURRENDER || id === PROMPT_RESET_STATS) {
            _prompt.opacity = 0;
        }
    };

    unprompt();

    if (ch === ESC) {
        return;
    }

    if (ch === RETURN) {
        switch (_prompt.id) {
            case PROMPT_START:
            case PROMPT_PLAY_AGAIN:
                onStart();
                break;
            case PROMPT_SURRENDER:
                onSurrender();
                break;
            case PROMPT_RESET_STATS:
                onResetStats();
                break;
            default: break;
        }

        return;
    }

    if (ch === SPACE) {
        _sob.input = [];
        return;
    }

    if (ch === BACKSPACE) {
        _sob.input.pop();
        return;
    }

    if (keyDisabled(ch)) {
        return;
    }

    if (_sob.input_solved) {
        _sob.input = [];
    }

    const count = Math.max(_sob.task.word.length, (_stack.tasks.at(0)?.word.length || 0));

    if (_sob.input.length >= count) {
        playSound('lost', { rate: 4 });
        return;
    }

    _sob.input.push(ch);
    const word = _sob.input.join('');

    if (_sob.task.word === word) {
        playSound('coin1');
        killTimer();
        _sob.task.solved = true;
        clearInput();
    } else if (_stack.top()?.word === word) {
        playSound('link1');
        clearInput();
        _stack.tasks.shift();
    }
};

export const makePool = () => {
    const d5 = _sob.easy ? dict5.slice(0, 1000) : dict5;
    const d = [...dict4, ...d5];

    const encode = (word) => {
        const decode = (cipher) => cipher.map(i => word[i]).join('');

        const solution = [...word].map((_, i) => i);
        let cipher;

        do {
            cipher = shuffle(solution);
        } while (decode(cipher) === word);

        return cipher;
    };

    _sob.task_pool = shuffle(d.map((word) => ({ word, cipher: encode(word) })));
};

export const onStart = () => {
    playSound('dice');

    _sob.over = false;
    _stack.tasks = [];

    makePool();
    nextTask({ delay: 300 });
};

export const onSurrender = () => {
    _sob.surrender_drop = calcDrop({ surrendering: true }) - calcDrop();
    addToStack();
    onOver();
};

export const onResetStats = () => { };
