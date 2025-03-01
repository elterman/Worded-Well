<script>
    import { take } from 'lodash-es';
    import { _state } from './shared.svelte';
    import { clientRect } from './utils';
    import WordPanel from './Word Panel.svelte';

    $effect(() =>
        setTimeout(() => {
            _state.letter_box_size = (clientRect('.well').height - 4) / 14;
        }),
    );
</script>

<div class="well">
    <div class="stack">
        {#each take(_state.pool, 14) as word}
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
        width: 290px;
        background-image: var(--background-gradient);
        overflow: hidden;
    }

    .stack {
        grid-area: 1/1;
        place-self: end center;
    }
</style>
