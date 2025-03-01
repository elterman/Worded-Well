/* eslint-disable no-undef */
import { PROMPT_PLAY, START_PAGE } from './const';

export const _sob = $state({
    sounds: true,
    page: START_PAGE,
    game_on: false,
    over: false,
    input: [],
    letter_box_size: 0,
    task_pool: [],
    task: null,
});

export const _prompt = $state({
    id: PROMPT_PLAY,
    opacity: 1
});

export const _stack = $state({
    tasks: [],
    top: () => _stack.tasks.at(-1),
    max_time: 14000,
});
