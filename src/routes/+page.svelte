<script>
    import { GAME_PAGE, START_PAGE } from '../const';
    import GamePage from '../Game Page.svelte';
    import { _state } from '../shared.svelte';
    import Splash from '../Splash.svelte';
    import StartPage from '../Start Page.svelte';
    import { isAlpha } from '../utils';

    $effect(() => {
        const disable = (e) => e.preventDefault();
        window.addEventListener('contextmenu', disable);

        const onKeyDown = (e) => {
            if (_state.page !== GAME_PAGE) {
                return;
            }

            if (e.altKey || e.shiftKey || e.ctrlKey) {
                return;
            }

            const ch = e.key.toUpperCase();

            if (ch === 'ESCAPE') {
                _state.input = [];
            } else if (ch === 'BACKSPACE') {
                _state.input.pop();
            } else if (isAlpha(ch)) {
                _state.input.push(ch);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('contextmenu', disable);
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    let splash = $state(true);
    setTimeout(() => (splash = false), 2000);
</script>

<div class="app" tabIndex={-1}>
    <GamePage />

    {#if _state.page === START_PAGE}
        <StartPage />
    {/if}

    {#if splash}
        <Splash />
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
        background: #3b3732;
        overflow: hidden;
        color: #522d18;
    }

    @font-face {
        font-family: Fredoka;
        src: url('../Fonts/Fredoka.ttf');
    }

    @font-face {
        font-family: Poppins;
        src: url('../Fonts/Poppins-Regular.ttf');
    }

    @font-face {
        font-family: Roboto;
        src: url('../Fonts/Roboto-Regular.ttf');
    }

    .app {
        display: grid;
        height: 100vh;
        background-image: url('src/Images/Stone Wall.webp');
        background-size: 150px;
        user-select: none;
    }
</style>
