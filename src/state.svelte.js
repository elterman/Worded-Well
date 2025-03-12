import { PROMPT_START, START_PAGE } from './const';

export const _sob = $state({
    page: START_PAGE,
    input: [],
    pool: [],
    max_travel_ms: 4500,
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

export const _stats = $state({
    solved: 0,
    points: 0,
    plays: 0,
    total_points: 0,
    best: 0,
    ave: () => _stats.plays ? Math.round(_stats.total_points / _stats.plays) : 0
});