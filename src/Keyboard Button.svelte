<script>
    import { BACKSPACE, ESC, RETURN } from './const';
    import { _state } from './shared.svelte';
    import { clientRect } from './utils';
    import Erase from '$lib/images/Erase.webp';

    const { ch } = $props();

    const cr = ch === RETURN;
    const bs = ch === BACKSPACE;
    const esc = ch === ESC;
    const label = cr ? 'ENTER' : ch;
    const classes = `button-base button ${bs ? 'backspace' : ''} ${cr ? 'return' : ''}`;
    const fsz = esc ? 10 : 18;

    let width = $state(cr ? 100 : bs ? 50 : esc ? 50 : 0);

    $effect(() => {
        if (width === 0) {
            const wx = clientRect('.game-page').width;
            const margins = 12;

            width = (wx - margins) / 11;
        }
    });

    const onClick = () => {
        if (esc) {
            _state.input = [];
        } else if (bs) {
            _state.input.pop();
        } else {
            _state.input.push(ch);
        }
    };
</script>

<button class={classes} tabindex={-1} style="width: {width}px" onpointerdown={onClick}>
    <span class="button-content" style="font-size: {fsz}px;">
        {#if bs}
            <img src={Erase} alt="erase" width={27} />
        {:else if esc}
            <div>CLEAR</div>
            <div>ALL</div>
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

    .button:hover {
        background: #ffffffe8;
    }

    .button:focus-visible {
        outline: none;
    }

    .button-content {
        display: grid;
        place-items: center;
    }

    .backspace {
        width: 60px;
    }

    .return {
        width: 100px;
        font-size: 16px;
    }
</style>
