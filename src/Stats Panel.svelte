<script>
    import { _score } from './state.svelte';
</script>

<div class="stats-bar">
    <span class="label">PLAYS</span>
    <span class="value">{_score.plays}</span>
    <span class="label">BEST</span>
    <span class="value">{_score.best}</span>
    <span class="label">AVE</span>
    <!-- <span class="value">{_score.ave()}</span> -->
</div>

<style>
    .stats-bar {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        grid-auto-flow: column;
        padding: 8px 0 5px;
        font-family: Amnestia;
        font-size: 10.5px;
        gap: 7px;
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
