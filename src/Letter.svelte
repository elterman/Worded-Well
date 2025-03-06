<script>
    import { fade, fly } from 'svelte/transition';
    import { _sob } from './shared.svelte';

    const { ch, off = 0, input } = $props();
    const sz = _sob.letter_box_size;
    const transform = $derived(`translateX(${(_sob.over ? off : 0) * sz}px)`);
    const fsz = Math.min(20, 0.65 * sz);
</script>

<div
    class={['button-base letter', { input }]}
    style="width: {sz}px; height: {sz}px; font-size: {fsz}px; border-width: {0.1 * fsz}px; transform: {transform}"
    in:fly={{ y: input ? 30 : 0, duration: input ? 100 : 0 }}
    out:fade={{ duration: input ? (_sob.solved ? 300 : 100) : 0 }}
>
    {ch}
</div>

<style>
    .letter {
        display: grid;
        border-radius: 3px;
        color: black;
        font-family: Poppins;
        font-weight: bold;
        cursor: initial;
        pointer-events: none;
        transition: transform 1s;
    }

    .input {
        box-shadow: 2px 2px 3px black;
    }
</style>
