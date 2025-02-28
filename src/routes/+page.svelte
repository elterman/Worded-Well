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
    :root {
        --background-image: linear-gradient(
            to right,
            #000000d0,
            #000000b0 25%,
            #000000a0,
            #000000a0,
            #000000b0 75%,
            #000000d0
        );

        --button-background: radial-gradient(#ffffffd0, #ffffffd0 100%);
    }

    :global(body) {
        margin: 0;
        background: #3b3732;
        overflow: hidden;
        color: #522d18;
    }

    :global(.button-base) {
        background: var(--button-background);
        border: 2px solid;
        border-color: white silver silver white;
        box-sizing: border-box;
        cursor: pointer;
        display: grid;
        place-content: center;
        transition: transform 0.1s;
        color: #522d18;
    }

    :global(.button-base:hover) {
        background: #ffffffe8;
    }

    @font-face {
        font-family: Fredoka;
        src: url('$lib/fonts/Fredoka.ttf');
    }

    @font-face {
        font-family: Poppins;
        src: url('$lib/fonts/Poppins-Regular.ttf');
    }

    @font-face {
        font-family: Roboto;
        src: url('$lib/fonts/Roboto-Regular.ttf');
    }

    .app {
        display: grid;
        height: 100vh;
        background-image: url('$lib/images/Stone Wall.webp');
        background-size: 250px;
        user-select: none;
    }
</style>
