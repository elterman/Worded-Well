<script>
    import { _score } from './state.svelte';
    import NumberFlow from '@number-flow/svelte';
</script>

<div class="panel">
    <span class="label">SOLVED</span>
    <span class="value"><NumberFlow value={_score.solved}/></span>
    <span class="label">SCORE</span>
    <span class="value"><NumberFlow value={_score.points || 0}/></span>
</div>

<style>
    .panel {
        grid-area: 2/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
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
