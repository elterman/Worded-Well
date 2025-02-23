<script>
    import { clientRect } from './utils';

    let width = $state(0);
    $effect(() => (width = clientRect('.game-page').width));
</script>

<div class="player-panel" style="width: {width}px">PLAYER PANEL</div>

<style>
    .player-panel {
        grid-area: 2/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        height: 60px;
        color: white;
        font-family: Fredoka;
        place-content: center;
        background: #00000080;
    }
</style>
