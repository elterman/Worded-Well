<script>
    import { BACKSPACE, ESC, RETURN } from './const';
    import { clientRect } from './utils';

    const { ch } = $props();
    $inspect(ch);

    const cr = ch === RETURN;
    const bs = ch === BACKSPACE;
    const esc = ch === ESC;
    const label = cr ? 'ENTER' : ch;
    const classes = `kb-button ${bs ? 'kb-backspace' : ''} ${cr ? 'kb-return' : ''}`;
    const fsz = esc ? 10 : 18;

    let width = $state(cr ? 100 : bs ? 50 : esc ? 50 : 0);

    $effect(() => {
        if (width === 0) {
            const wx = clientRect('.game-page').width;
            const margins = 12;

            width = (wx - margins) / 11;
        }
    });
</script>

<div class={classes} style="width: {width}px">
    <span class='kb-button-content' style="font-size: {fsz}px;">
        {#if bs}
            <img src="src/Images/Erase.webp" alt="erase" width={27} />
        {:else if esc}
            <div>CLEAR</div>
            <div>ALL</div>
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
        height: 44px;
        font-family: Roboto;
        font-weight: bold;
        background: #000000c0;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
        box-shadow: 1px 1px 1px black;
    }

    .kb-button:hover {
        background: #000000a0;
    }

    .kb-button-content {
        display: grid;
        place-items: center;
    }

    .kb-backspace {
        width: 60px;
    }

    .kb-return {
        width: 100px;
        font-size: 16px;
    }
</style>
