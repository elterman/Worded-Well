<script>
    // import { clientRect } from './utils';
    // let width = $state(0);
    // $effect(() => (width = clientRect('.game-page').width));
</script>

<div class="score-panel">123456</div>

<style>
    .score-panel {
        grid-area: 2/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        padding: 4px 0 5px;
        font-family: Poppins;
        place-content: center;
        color: white;
        width: 290px;
        background-image: var(--background-image);
    }
</style>
