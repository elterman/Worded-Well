<script>
    import { fade } from 'svelte/transition';
    import { GAME_PAGE } from './const';
    import { _state } from './shared.svelte';
    import { windowSize } from './utils';

    let width = $state(0);
    let scale = $state(1);

    $effect(() => {
        const onResize = () => {
            const { x: wx } = windowSize();
            width = Math.min(wx * 0.9, 360);
        };

        onResize();

        const onTransitionEnd = (e) => {
            if (e.target.id !== 'play') {
                return;
            }

            if (scale < 1) {
                scale = 1;
            } else {
                _state.page = GAME_PAGE;
            }
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('transitionend', onTransitionEnd);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('transitionend', onTransitionEnd);
        };
    });

    const onClick = () => (scale = 0.7);
</script>

<div class="start-page" in:fade={{ duration: 100 }} out:fade={{ duration: 200 }}>
    <img class="shadow" src="src/Images/Title.webp" alt="" {width} />
    <img src="src/Images/Intro.webp" alt="" {width} />
    <button id="play" onpointerdown={onClick} style="transform: scale({scale})">
        <img class="button shadow" src="src/Images/Play.webp" alt="" width={60} />
    </button>
</div>

<style>
    .start-page {
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        background-image: url('src/Images/Stone Wall.webp');
        background-size: 150px;
        place-content: center;
        z-index: 2;
      }

    .shadow {
        filter: drop-shadow(0 0 5px #000);
    }

    button {
        justify-self: center;
        background: none;
        border: none;
        transition: transform 0.1s;
    }
</style>
