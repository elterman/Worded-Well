<script>
    import InputPanel from './Input Panel.svelte';
    import Keyboard from './Keyboard.svelte';
    import LookupPrompt from './Lookup Prompt.svelte';
    import Prompt from './Prompt.svelte';
    import ScorePanel from './Score Panel.svelte';
    import StatsBar from './Stats Panel.svelte';
    import Toolbar from './Toolbar.svelte';
    import Well from './Well.svelte';
</script>

<div class="game-page">
    <StatsBar />
    <ScorePanel />
    <Well />
    <LookupPrompt />
    <Prompt />
    <InputPanel />
    <Keyboard />
    <Toolbar />
</div>

<style>
    .game-page {
        place-self: center;
        grid-area: 1/1;
        place-content: center;
        height: calc(min(100dvh - 20px, 780px));
        width: calc(min(100dvw, 430px));
        display: grid;
        grid: auto auto 1fr auto auto auto / auto;
        gap: 10px;
        padding: 10px 0;
    }
</style>
