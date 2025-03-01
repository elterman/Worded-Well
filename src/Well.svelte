<script>
    import { STACK_CAPACITY, TICK_MS } from './const';
    import { _sob, _stack } from './shared.svelte';
    import { clientRect } from './utils';
    import WordPanel from './Word Panel.svelte';

    $effect(() =>
        setTimeout(() => {
            _sob.letter_box_size = clientRect('.well').height / STACK_CAPACITY;
        }),
    );

    const drop = $derived.by(() => {
        if (!_sob.letter_box_size) {
            return 0;
        }

        const rowPx = _sob.letter_box_size;
        const totalTicks = _sob.max_travel_ms / TICK_MS;
        const stackPx = _stack.tasks.length * rowPx;
        const travelPx = clientRect('.well').height - rowPx - stackPx;
        const deltaPx = travelPx / totalTicks;
        const px = _sob.ticks * deltaPx;
        return px - rowPx;
    });
</script>

<div class="well">
    {#if _sob.task}
        <div class="task" style="transform: translateY({drop}px); transition: transform {TICK_MS}ms;">
            <WordPanel chars={[..._sob.task[1]]} />
        </div>
    {/if}
    <div class="stack">
        {#each [..._stack.tasks].reverse() as word}
            <WordPanel chars={[...word[1]]} />
        {/each}
    </div>
</div>

<style>
    .well {
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
    }

    .stack {
        grid-area: 1/1;
        place-self: end center;
    }
</style>
