<script>
    import { STACK_CAPACITY, TICK_MS } from './const';
    import { calcDrop } from './shared.svelte';
    import { _sob, _stack } from './state.svelte';
    import TaskPanel from './Task Panel.svelte';
    import { clientRect, later } from './utils';

    let height = 0;

    $effect(() =>
        later(() => {
            height = clientRect('.well').height;
            _sob.tile_sz = height / STACK_CAPACITY;
        }),
    );

    const drop = $derived.by(calcDrop);
</script>

<div class="glow-left"></div>
<div class="glow-right"></div>
<div class="glow-bottom"></div>
<div class="well">
    {#if _sob.task}
        <div class="task" style="transform: translateY({drop}px); transition: {_sob.ticks ? TICK_MS : 0}ms">
            <TaskPanel task={_sob.task} />
        </div>
    {/if}
    <div class="stack">
        {#each [..._stack.tasks] as task, index (task.word)}
            <TaskPanel {task} {index} />
        {/each}
    </div>
</div>

<style>
    .well {
        z-index: 1;
        grid-area: 3/1;
        place-self: center;
        display: grid;
        height: 100%;
        width: 200px;
        background-image: var(--background-gradient);
        overflow: hidden;
    }

    .task {
        grid-area: 1/1;
        place-self: start center;
        z-index: 1;
    }

    .stack {
        grid-area: 1/1;
        place-self: end center;
    }

    .glow-left,
    .glow-right,
    .glow-bottom {
        grid-area: 3/1;
        place-self: end center;
        width: 4px;
        height: 100%;
        --color: var(--gold);
        box-shadow: 0 0 10px var(--color);
        border-color: transparent var(--color) var(--color) var(--color);
    }

    .glow-left {
        transform: translateX(-97px);
    }

    .glow-right {
        transform: translateX(97px);
    }

    .glow-bottom {
        width: 200px;
        height: 4px;
    }
</style>
