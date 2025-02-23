<script>
    import Keyboard from './Keyboard.svelte';
    import PlayerPanel from './Player Panel.svelte';
    import { _state } from './shared.svelte';
    import StatsBar from './Stats Bar.svelte';
    import Toolbar from './Toolbar.svelte';
    import { clientRect } from './utils';
    import Well from './Well.svelte';

    $effect(() => {
        const onResize = () => {
            const wx = clientRect('.app').width;
            const kw = 400;
            const margins = 12;
            const w = Math.min(kw, wx - margins);

            _state.kbScale = w < kw ? w / kw : 1;
        };

        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });
</script>

<div class="game-page">
    <StatsBar />
    <PlayerPanel />
    <Well/>
    <Keyboard />
    <Toolbar />
</div>

<style>
    .game-page {
        place-self: center;
        grid-area: 1/1;
        place-content: center;
        height: calc(min(100vh - 20px, 800px));
        width: calc(min(100vw, 430px));
        display: grid;
        grid: auto auto 1fr auto auto auto / auto;
        gap: 10px;
        padding: 10px 0;
    }
</style>
