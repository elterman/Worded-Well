<script>
    import { fly } from 'svelte/transition';
    import { STACK_CAPACITY } from './const';
    import { _stack, _sob } from './shared.svelte';
    import { clientRect } from './utils';
    import WordPanel from './Word Panel.svelte';

    $effect(() =>
        setTimeout(() => {
            _sob.letter_box_size = (clientRect('.well').height - 4) / STACK_CAPACITY;
        }),
    );

    $effect(() => {});
</script>

<div class="well">
    {#if _sob.task}
        <div class="task" in:fly={{ y: -_sob.letter_box_size }}>
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
