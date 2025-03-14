<script>
    import Intro from '$lib/images/Intro.webp';
    import Play from '$lib/images/Play.webp';
    import Title from '$lib/images/Title.webp';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import ImageButton from './Image Button.svelte';
    import { APP_STATE, GAME_PAGE } from './const';
    import { playSound } from './sound.svelte';
    import { _sob, _stats } from './state.svelte';
    import { focusOnApp, later, windowSize } from './utils';
    import { startTimer } from './shared.svelte';

    let width = $state(0);
    let content = $state(null);
    let scale = $state(1);

    onMount(() => {
        later(() => {
            const json = localStorage.getItem(APP_STATE);
            const job = JSON.parse(json);

            if (job) {
                _stats.plays = job.plays;
                _stats.total_points = job.total_points;
                _stats.best = job.best;
                _sob.lookup_prompt = job.lookup_prompt;
            }
        }, 2000);
    });

    $effect(() => {
        const onResize = () => {
            const { x: wx } = windowSize();
            width = Math.min(wx * 0.9, 360);
        };

        later(() => {
            const { y: wy } = windowSize();
            const pageHi = content.getBoundingClientRect().height + 70;

            if (pageHi > wy) {
                scale = wy / pageHi;
            }
        });

        onResize();
        focusOnApp();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });

    const onPlay = () => {
        playSound('score2');
        _sob.page = GAME_PAGE;

        if (_sob.ticks) {
            startTimer();
        }
    };

    const style = 'place-self: center; filter: drop-shadow(0 0 5px #000)';
</script>

<div class="page" in:fade={{ duration: 100 }} out:fade={{ duration: 200 }}>
    <div class="content" bind:this={content} style="transform: scale({scale})">
        <img class="shadow" src={Title} alt="" {width} />
        <img src={Intro} alt="" {width} />
        <ImageButton src={Play} width={60} onClick={onPlay} {style} />
    </div>
    <div class="version">1426</div>
</div>

<style>
    .page {
        height: 100dvh;
        grid-area: 1/1;
        display: grid;
        background-image: url('$lib/images/Stone Wall.webp');
        background-size: 250px;
        place-content: center;
        z-index: 100;
    }

    .content {
        display: grid;
        gap: 50px;
    }

    .shadow {
        filter: drop-shadow(0 0 5px #000);
    }

    .version {
        /* display: none; */
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: var(--gold);
        padding: 6px 15px 3px;
        border-radius: 50vh;
        font-family: Amnestia;
    }
</style>
