<script>
    import Intro from '$lib/images/Intro.webp';
    import Play from '$lib/images/Play.webp';
    import Title from '$lib/images/Title.webp';
    import { fade } from 'svelte/transition';
    import Button from './Button.svelte';
    import { GAME_PAGE } from './const';
    import { _state } from './shared.svelte';
    import { windowSize } from './utils';

    let width = $state(0);

    $effect(() => {
        const onResize = () => {
            const { x: wx } = windowSize();
            width = Math.min(wx * 0.9, 360);
        };

        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });

    const style = 'filter: drop-shadow(0 0 5px #000)';
</script>

<div class="start-page" in:fade={{ duration: 100 }} out:fade={{ duration: 200 }}>
    <img class="shadow" src={Title} alt="" {width} />
    <img src={Intro} alt="" {width} />
    <Button src={Play} width={60} onClick={() => (_state.page = GAME_PAGE)} {style} />
</div>

<style>
    .start-page {
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        background-image: url('$lib/images/Stone Wall.webp');
        background-size: 150px;
        place-content: center;
        z-index: 2;
    }

    .shadow {
        filter: drop-shadow(0 0 5px #000);
    }
</style>
