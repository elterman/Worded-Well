/* eslint-disable no-undef */
import { PROMPT_PLAY, START_PAGE, TICK_MS } from './const';

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
    timer_id: null,
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

export const nextTask = (solved) => {
    clearInterval(_sob.timer_id);

    setTimeout(() => {
        if (!solved) {
            _stack.tasks.unshift(_sob.task);
        }

        _sob.ticks = 0;
        _sob.task = _sob.task_pool.pop();

        setTimeout(() => {
            _sob.timer_id = setInterval(() => (_sob.ticks += 1), TICK_MS);
        }, 500);
    });
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
        clearInput();
        nextTask(true);
        return;
    }

    if (_stack.top()?.solution === word) {
        clearInput();

        _stack.tasks.shift(_sob.task);
    }
};
