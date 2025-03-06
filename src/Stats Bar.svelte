<script>
    const sample = 'plays  99    ave  9999    best  9999';
</script>

<div class="stats-bar">
    {sample}
</div>

<style>
    .stats-bar {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        grid-auto-flow: column;
        padding: 8px 0 5px;
        font-family: Amnestia;
        font-size: 10px;
        place-content: center;
        color: white;
        text-shadow: 1px 1px black;
        width: 200px;
        background-image: var(--background-gradient);
        background: radial-gradient(#ff8c00c0, #4c2c06 80%);
        background: linear-gradient(to right, #4c2c06, #4c2c06c0, #ff8c00c0, #4c2c06c0, #4c2c06);
    }
</style>
