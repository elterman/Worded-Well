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
        font-family: Fredoka;
        place-content: center;
        color: white;
        width: 290px;

        background-image: linear-gradient(
            to right,
            #000000d0,
            #000000b0 25%,
            #000000a0,
            #000000a0,
            #000000b0 75%,
            #000000d0
        );
    }
</style>
