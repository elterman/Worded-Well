<script>
    import { BACKSPACE, RETURN } from './const';
    import { clientRect } from './utils';

    const { ch } = $props();
    $inspect(ch);

    const cr = ch === RETURN;
    const bs = ch === BACKSPACE;
    const clear = ch === '~';
    const label = cr ? 'ENTER' : ch;
    const classes = `kb-button ${bs ? 'kb-backspace' : ''} ${cr ? 'kb-return' : ''}`;

    let width = $state(cr ? 100 : bs ? 50 : clear ? 50 : 0);

    $effect(() => {
        if (width === 0) {
            const wx = clientRect('.game-page').width;
            const margins = 12;

            width = (wx - margins) / 11;
        }
    });
</script>

<div class={classes} style="width: {width}px">
    <span style="display: grid">
        {#if bs}
            <img src="src/Images/Erase.webp" alt="erase" width={27} />
        {:else if clear}
            <img src="src/Images/Clear All.webp" alt="clear all" width={40} />
        {:else}
            {label}
        {/if}
    </span>
</div>

<style>
    .kb-button {
        display: grid;
        place-content: center;
        place-items: center;
        /* width: 36px; */
        height: 44px;
        font-size: 18px;
        background: #000000c0;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
        box-shadow: 1px 1px 1px black;
    }

    .kb-button:hover {
        background: #000000a0;
    }

    .kb-backspace {
        width: 60px;
    }

    .kb-return {
        width: 100px;
        font-size: 16px;
    }
</style>
