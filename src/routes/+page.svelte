<script>
    import { BACKSPACE, ESC, GAME_PAGE, RETURN, SPACE, START_PAGE } from '../const';
    import GamePage from '../Game Page.svelte';
    import { onKeyInput } from '../shared.svelte';
    import Splash from '../Splash.svelte';
    import StartPage from '../Start Page.svelte';
    import { _sob } from '../state.svelte';
    import { isAlpha, later } from '../utils';

    $effect(() => {
        const disable = (e) => e.preventDefault();
        window.addEventListener('contextmenu', disable);

        const onKeyDown = (e) => {
            if (e.altKey || e.shiftKey || e.ctrlKey) {
                return;
            }

            let ch = e.key.toUpperCase();

            if (_sob.page === START_PAGE) {
                if (ch === 'ENTER') _sob.page = GAME_PAGE;
                return;
            }

            if (ch === 'BACKSPACE') {
                ch = BACKSPACE;
            } else if (ch === 'ESCAPE') {
                ch = ESC;
            } else if (ch === 'ENTER') {
                ch = RETURN;
            }

            if (isAlpha(ch) || ch === SPACE || ch === BACKSPACE || ch === RETURN || ch === ESC) {
                onKeyInput(ch);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('contextmenu', disable);
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    let splash = $state(true);

    later(() => {
        splash = false;
    }, 2000);
</script>

<div class="app" tabIndex={-1}>
    <div class="vignette"></div>
    <GamePage />

    {#if _sob.page === START_PAGE}
        <StartPage />
    {/if}

    {#if splash}
        <Splash />
    {/if}
</div>

<style>
    :root {
        --gold: #ffe4ad;
        --button-text-color: #522d18;
        --orange-gradient: linear-gradient(to right, #4c2c06 -70%, #4c2c06c0, #ff8c00b0, #4c2c06c0, #4c2c06 170%);
        --background-gradient: linear-gradient(
            to right,
            #000000b8,
            #00000098 25%,
            #00000088,
            #00000088,
            #00000098 75%,
            #000000b8
        );
    }

    :global {
        body {
            margin: 0;
            overflow: hidden;
        }

        .button-base {
            background: #ffffffe8;
            border: 2px solid;
            border-color: white silver silver white;
            box-sizing: border-box;
            cursor: pointer;
            display: grid;
            place-content: center;
            transition: transform 0.1s;
            color: var(--button-text-color);
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .button-base:hover {
            background: #fffffff8;
        }

        .button-base:focus {
            outline: none !important;
        }

        .gradient-text {
            background: -webkit-linear-gradient(#f3d97b, #df7842 150%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-wrap-mode: nowrap;
        }
    }

    .app {
        display: grid;
        height: 100dvh;
        background-image: url('$lib/images/Stone Wall.webp');
        background-size: 250px;
        user-select: none;
    }

    .vignette {
        grid-area: 1/1;
        background-image: radial-gradient(transparent, black 150%);
    }

    @font-face {
        font-family: Amnestia;
        src: url('$lib/fonts/Amnestia.ttf');
    }

    @font-face {
        font-family: Poppins;
        src: url('$lib/fonts/Poppins-Regular.ttf');
    }

    @font-face {
        font-family: Roboto;
        src: url('$lib/fonts/Roboto-Regular.ttf');
    }
</style>
