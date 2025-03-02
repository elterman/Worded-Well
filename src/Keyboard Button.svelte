<script>
    import Erase from '$lib/images/Erase.webp';
    import { BACKSPACE, RETURN, SPACE } from './const';
    import { _sob, onCharIniput } from './shared.svelte';
    import { clientRect, isMobile } from './utils';

    const { ch } = $props();

    const cr = ch === RETURN;
    const bs = ch === BACKSPACE;
    const space = ch === SPACE;
    const label = cr ? 'ENTER' : ch;
    const classes = `button-base button ${bs ? 'backspace' : ''} ${cr ? 'return' : ''}`;
    const fsz = space ? 10 : 18;

    let width = $state(cr ? 100 : bs ? 50 : space ? 50 : 0);

    $effect(() => {
        if (width === 0) {
            const wx = clientRect('.game-page').width;
            const margins = 12;

            width = (wx - margins) / 11;
        }
    });

    const onPointerDown = () => {
        if (space) {
            _sob.input = [];
        } else if (bs) {
            _sob.input.pop();
        } else {
            onCharIniput(ch);
        }
    };
</script>

<button class={classes} tabindex={-1} style="width: {width}px" onpointerdown={onPointerDown}>
    <span class="button-content" style="font-size: {fsz}px;">
        {#if bs}
            <img src={Erase} alt="erase" width={27} />
        {:else if space}
            <div>CLEAR</div>
            <div>{isMobile() ? 'ALL' : '(SPACE)'}</div>
        {:else}
            {label}
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
    }

    .button:focus-visible {
        outline: none;
    }

    .button-content {
        display: grid;
        place-items: center;
    }

    .button:hover {
        color: firebrick;
    }

    .backspace {
        width: 60px;
    }

    .return {
        width: 100px;
        font-size: 16px;
    }
</style>
