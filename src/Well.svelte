<script>
    import { STACK_CAPACITY, TICK_MS } from './const';
    import { _sob, _stack } from './shared.svelte';
    import { clientRect } from './utils';
    import WordPanel from './Word Panel.svelte';

    let height = 0;

    $effect(() =>
        setTimeout(() => {
            height = clientRect('.well').height;
            _sob.letter_box_size = height / STACK_CAPACITY;
        }),
    );

    const drop = $derived.by(() => {
        if (!_sob.letter_box_size) {
            return 0;
        }

        const rowPx = _sob.letter_box_size;
        const stackPx = _stack.tasks.length * rowPx;
        const travelPx = height - stackPx;
        const travelMs = _sob.max_travel_ms * (travelPx / height);
        const deltaPx = (travelPx / travelMs) * TICK_MS;
        const px = _sob.ticks * deltaPx - rowPx;

        if (px + rowPx >= height) {
            setTimeout(() => {
                _stack.tasks.push(_sob.task);
                _sob.task = null;
                _sob.ticks = 0;
                clearInterval(_sob.timer_id);
            });
        }

        return px;
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
