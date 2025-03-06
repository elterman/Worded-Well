<script>
    const sample = 'plays  0    best  0    ave  0';
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
        font-size: 11px;
        place-content: center;
        color: #000000c0;
        width: 200px;
        background: var(--orange-gradient);
        filter: drop-shadow(0 2px 2px black);
    }
</style>
