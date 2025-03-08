<script>
    import Erase from '$lib/images/Erase.webp';
    import { BACKSPACE, SPACE } from './const';
    import { keyDisabled, onKeyInput } from './shared.svelte';
    import { playSound } from './sound.svelte';
    import { clientRect, isMobile } from './utils';

    const { ch } = $props();

    let timer = $state(null);

    const bs = ch === BACKSPACE;
    const space = ch === SPACE;
    const disabled = $derived(keyDisabled(ch));
    const fsz = space ? 10 : 18;

    let width = $state(bs ? 50 : space ? 50 : 0);

    $effect(() => {
        if (width === 0) {
            width = clientRect('.game-page').width;
            width = (width - 12) / 11;
        }
    });

    const onPointerDown = () => {
        playSound('tap');
        onKeyInput(ch);

        if (bs) {
            timer = setTimeout(() => onKeyInput(SPACE), 700);
        }
    };

    const onPointerUp = () => {
        if (bs) {
            clearTimeout(timer);
            timer = null;
        }
    };
</script>

<button
    class={['button-base button', { bs }, { disabled }]}
    style="width: {width}px"
    onpointerdown={onPointerDown}
    onpointerup={onPointerUp}
>
    <span class="content" style="font-size: {fsz}px;">
        {#if bs}
            <img src={Erase} alt="erase" width={27} />
        {:else if space}
            <div>CLEAR</div>
            <div>{isMobile() ? 'ALL' : '(SPACE)'}</div>
        {:else}
            {ch}
        {/if}
    </span>
</button>

<style>
    .button {
        place-items: center;
        height: 44px;
        font-family: Roboto;
        font-weight: bold;
        border-radius: 4px;
        box-shadow: 2px 2px 3px black;
        transition: 0.3s;
    }

    .button:focus-visible {
        outline: none;
    }

    .content {
        display: grid;
        place-items: center;
    }

    .disabled {
        border: none;
        box-shadow: none;
        pointer-events: none;
        background: #808080e8;
    }

    .bs {
        width: 60px;
    }
</style>
