<script>
    import { _state } from './shared.svelte';
    import { clientRect } from './utils';
    import WordPanel from './Word Panel.svelte';

    let range = $state(null);

    $effect(() =>
        setTimeout(() => {
            _state.letter_box_size = (clientRect('.well').height - 4) / 14;
            range
             = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        }),

    );
</script>

<div class="well">
    {#each range as i}
        <WordPanel chars={_state.input} />
    {/each}
</div>

<style>
    .well {
        grid-area: 3/1;
        place-self: center;
        display: grid;
        place-content: end center;
        height: 100%;
        width: 290px;
        background-image: linear-gradient(
            to right,
            #000000d0,
            #000000b0 25%,
            #000000a0,
            #000000a0,
            #000000b0 75%,
            #000000d0
        );
        overflow: hidden;
        border: 2px solid;
        border-color: transparent #ffffffb0 #ffffffb0;
        box-sizing: border-box;
    }
</style>
