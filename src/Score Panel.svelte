<script>
    // import { clientRect } from './utils';

    // let width = $state(0);
    // $effect(() => (width = clientRect('.game-page').width));
</script>

<div class="score-panel">1</div>

<style>
    .score-panel {
        grid-area: 2/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        min-width: 150px;
        padding: 0 10px;
        font-family: Fredoka;
        font-size: 28px;
        place-content: center;
        box-shadow: 2px 2px 3px black;
        background: radial-gradient(#ffffffc0, #ffffffc0 100%);
        border: 2px solid;
        border-color: white silver silver white;
        box-sizing: border-box;
        border-radius: 20px;
    }
</style>
