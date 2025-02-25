<script>
    import { fade, fly } from 'svelte/transition';
    import { _state } from './shared.svelte';

    const { ch, input } = $props();

    const sz = _state.letter_box_size;
    const fsz = Math.min(20, 0.67 * sz);
</script>

<div
    class="letter"
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
        place-content: center;
        font-family: Roboto;
        font-weight: bold;
        box-shadow: 2px 2px 3px black;
        background: radial-gradient(#ffffffc0, #ffffffc0 100%);
        border-style: solid;
        border-color: white silver silver white;
        box-sizing: border-box;
    }
</style>
