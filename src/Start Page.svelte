<script>
    import Intro from '$lib/images/Intro.webp';
    import Play from '$lib/images/Play.webp';
    import Title from '$lib/images/Title.webp';
    import { fade } from 'svelte/transition';
    import ImageButton from './Image Button.svelte';
    import { GAME_PAGE } from './const';
    import { _sob } from './shared.svelte';
    import { focusOnApp, windowSize } from './utils';
    import { playSound } from './sound.svelte';

    let width = $state(0);

    $effect(() => {
        const onResize = () => {
            const { x: wx } = windowSize();
            width = Math.min(wx * 0.9, 360);
        };

        onResize();
        focusOnApp();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });

    const onPlay = () => {
        playSound('plop');
        _sob.page = GAME_PAGE;
    };

    const style = 'place-self: center; filter: drop-shadow(0 0 5px #000)';
</script>

<div class="start-page" in:fade={{ duration: 100 }} out:fade={{ duration: 200 }}>
    <img class="shadow" src={Title} alt="" {width} />
    <img src={Intro} alt="" {width} />
    <ImageButton src={Play} width={60} onClick={onPlay} {style} />
    <div class="version">LOOKUP</div>
</div>

<style>
    .version {
        /* display: none; */
        position: absolute;
        right: 10px;
        top: 10px;
        background: #000000b0;
        color: white;
        padding: 6px 15px 3px;
        border-radius: 50vh;
        font-family: Amnestia;
    }

    .start-page {
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        background-image: url('$lib/images/Stone Wall.webp');
        background-size: 250px;
        place-content: center;
        z-index: 1000;
    }

    .shadow {
        filter: drop-shadow(0 0 5px #000);
    }
</style>
