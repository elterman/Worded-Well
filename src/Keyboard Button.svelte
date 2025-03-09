<script>
    import Erase from '$lib/images/Erase.webp';
    import { range } from 'lodash-es';
    import { BACKSPACE, SPACE } from './const';
    import { _sob, keyDisabled, onKeyInput } from './shared.svelte';
    import { playSound } from './sound.svelte';
    import { clientRect, isMobile, later } from './utils';

    const { ch } = $props();

    let timer = $state(null);

    const mobile = isMobile();
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
            timer = later(() => {
                for (const i in range(_sob.input.length)) {
                    later(() => playSound('tap'), i * 35);
                }

                later(() => onKeyInput(SPACE), 100);
            }, 600);
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
    class={['button-base', { mobile }, { button: !mobile }, { bs }, { disabled }]}
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
    .button,
    .mobile {
        place-items: center;
        height: 44px;
        font-family: Roboto;
        font-weight: bold;
        border-radius: 4px;
        box-shadow: 2px 2px 3px black;
        transition: 0.3s;
    }

    .button:hover {
        color: firebrick;
    }

    .mobile:hover {
        background: #ffffffe8;
        color: var(--button-text-color);
    }

    /* .button:focus-visible {
        outline: none;
    } */

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

    .disabled:hover {
        border: none;
        box-shadow: none;
        background: #808080e8;
        color: var(--button-text-color);
    }

    .bs {
        width: 60px;
    }
</style>
