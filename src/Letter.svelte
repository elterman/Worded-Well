<script>
    const { ch } = $props();
</script>

<div class="letter">{ch}</div>

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
        background: radial-gradient(#FFFFFFC0, #FFFFFFC0 100%);
    }
</style>
