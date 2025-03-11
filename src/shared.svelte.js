import { dict4 } from '$lib/dicts/dict4';
import { dict5 } from '$lib/dicts/dict5';
import { shuffle } from 'lodash-es';
import { BACKSPACE, ESC, MAX_POINTS, MIN_POINTS, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_START, PROMPT_SURRENDER, RETURN, SPACE, STACK_CAPACITY, TICK_MS } from './const';
import { playSound } from './sound.svelte';
import { _prompt, _score, _sob, _stack } from './state.svelte';
import { clientRect, later } from './utils';

export const calcDrop = (props = {}) => {
    const { toBottom, onHitBottom } = props;

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

    if (toBottom) {
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
    _sob.task = _sob.pool.pop();
    _sob.task.dob = Date.now();

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
        playSound('lost', { rate: 4 });
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

    const onSolved = (task, drop) => {
        clearInput();

        const calcGain = () => {
            const span = Date.now() - task.dob;
            let fr = 1 - (span / _sob.max_travel_ms);
            fr = Math.max(0, fr);
            let gain = Math.round(MAX_POINTS * fr);
            gain = Math.max(gain, MIN_POINTS);
            gain *= task.word.length === 4 ? 1 : 3;

            return gain;
        };

        _score.solved += 1;

        const points = calcGain();
        _score.gain = { points, drop };
        _score.points += points;
        _score.total_points += points;

        if (_score.points > _score.best) {
            _score.best = _score.points;
        }

        later(() => _score.gain = null, 1000);
    };

    _sob.input.push(ch);
    const word = _sob.input.join('');

    if (_sob.task.word === word) {
        playSound('coin1');
        killTimer();
        _sob.task.solved = true;
        onSolved(_sob.task, calcDrop());
    } else if (_stack.top()?.word === word) {
        playSound('coin1');
        onSolved(_stack.top(), calcDrop({ toBottom: true }) + _sob.tile_sz / 2);
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

    _sob.pool = shuffle(d.map((word) => ({ word, cipher: encode(word) })));
};

export const onStart = () => {
    playSound('dice');

    _sob.over = false;
    _stack.tasks = [];
    _score.solved = 0;
    _score.points = 0;
    _score.plays += 1;

    makePool();
    nextTask({ delay: 300 });
};

export const onSurrender = () => {
    _sob.surrender_drop = calcDrop({ toBottom: true }) - calcDrop();
    addToStack();
    onOver();
};

export const onResetStats = () => {
    const gameOn = _sob.game_on && !_sob.over;
    _score.plays = gameOn ? 1 : 0;
    _score.best = _score.total_points = gameOn ? _score.gain.points : 0;
};
