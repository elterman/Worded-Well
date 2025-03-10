<script>
</script>

<div class="score-panel">
    <span class="label">SOLVED</span>
    <span class="value">123</span>
    <span class="label">SCORE</span>
    <span class="value">9876</span>
</div>

<style>
    .score-panel {
        grid-area: 2/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        padding: 5px 0 2px;
        font-family: Amnestia;
        font-size: 13px;
        gap: 10px;
        place-content: center;
        width: 200px;
        background: var(--orange-gradient);
        filter: drop-shadow(0 2px 2px black);
    }

    .label {
        color: #000000a0;
    }

    .value {
        color: #ffe4ad;
    }
</style>
