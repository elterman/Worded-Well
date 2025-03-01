/* eslint-disable no-undef */
import { PROMPT_PLAY, START_PAGE } from './const';

export const _state = $state({
    sounds: true,
    page: START_PAGE,
    game_on: false,
    over: false,
    input: [],
    letter_box_size: 0,
    pool: [],
    stack: [],
});

export const _prompt = $state({ id: PROMPT_PLAY, opacity: 1 });