<script>
    import WordPanel from './Input Panel.svelte';
    import Keyboard from './Keyboard.svelte';
    import ScorePanel from './Score Panel.svelte';
    import StatsBar from './Stats Bar.svelte';
    import Toolbar from './Toolbar.svelte';
    import Well from './Well.svelte';
</script>

<div class="game-page">
    <StatsBar />
    <ScorePanel />
    <Well/>
    <WordPanel input/>
    <Keyboard />
    <Toolbar />
</div>

<style>
    .game-page {
        place-self: center;
        grid-area: 1/1;
        place-content: center;
        height: calc(min(100vh - 20px, 780px));
        width: calc(min(100vw, 430px));
        display: grid;
        grid: auto auto 1fr auto auto auto / auto;
        gap: 10px;
        padding: 10px 0;
    }
</style>
