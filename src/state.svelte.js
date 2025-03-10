import { PROMPT_START, START_PAGE, TICK_MS } from './const';

export const _sob = $state({
    page: START_PAGE,
    input: [],
    task_pool: [],
    max_travel_ms: 14500,
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

export const _score = $state({
    solved: 0,
    points: 0,
    total_points: 0,
    plays: 0,
    best: 0,
    ave: 0,
});