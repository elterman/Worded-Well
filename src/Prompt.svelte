<script>
    import Letter from './Letter.svelte';
</script>

<div class="prompt">Play again?</div>

<style>
    .prompt {
        grid-area: 3/1;
        place-self: center;
        display: grid;
        border-radius: 8px;
        place-content: center;
        font-family: Fredoka;
        font-size: 18px;
        box-shadow: 0 0 5px black;
        background: radial-gradient(#fffffff0, #fffffff0 100%);
        border-style: solid;
        border-color: white silver silver white;
        box-sizing: border-box;
        padding: 5px 10px;
        color: #522d18;
    }
</style>
