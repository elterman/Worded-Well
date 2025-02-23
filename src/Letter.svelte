<script>
    const { ch } = $props();
</script>

<div class="letter">{ch}</div>

<style>
    .letter {
        display: grid;
        border-radius: 10px;
        color: black;
        place-content: center;
        font-family: Roboto;
        font-size: 64px;
        font-weight: bold;
        width: 100px;
        aspect-ratio: 1;
        box-shadow: 10px 10px 10px black;
        background: radial-gradient(#FFFFFFC0, #FFFFFFC0 100%);
    }
</style>
