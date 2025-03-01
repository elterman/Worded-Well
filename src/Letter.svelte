<script>
    import { fade, fly } from 'svelte/transition';
    import { _sob } from './shared.svelte';

    const { ch } = $props();

    const sz = _sob.letter_box_size;
    const fsz = Math.min(20, 0.65 * sz);
</script>

<div
    class="button-base letter"
    style="width: {sz}px; height: {sz}px; font-size: {fsz}px; border-width: {0.1 * fsz}px"
    in:fly={{ y: 30, duration: 100 }}
    out:fade={{ duration: 100 }}
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
        box-shadow: 2px 2px 3px black;
        cursor: initial;
        pointer-events: none;
    }
</style>
