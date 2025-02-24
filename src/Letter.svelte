<script>
    import { fade, fly } from 'svelte/transition';

    const { ch, stackIndex } = $props();
</script>

<div class="letter" in:fly={{ y: 30, duration: 100 }} out:fade={{ duration: 100 }}>{ch}</div>

<style>
    .letter {
        display: grid;
        border-radius: 3px;
        color: black;
        place-content: center;
        font-family: Roboto;
        font-size: 20px;
        font-weight: bold;
        width: 30px;
        aspect-ratio: 1;
        box-shadow: 2px 2px 3px black;
        background: radial-gradient(#ffffffc0, #ffffffc0 100%);
        border: 2px solid;
        border-color: white silver silver white;
        box-sizing: border-box;
    }
</style>
