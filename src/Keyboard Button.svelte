<script>
    import { BACKSPACE, RETURN } from './const';
    import { _state } from './shared.svelte';

    const { ch } = $props();

    const cr = ch === RETURN;
    const bs = ch === BACKSPACE;
    const label = cr ? 'ENTER' : bs ? bs : ch;
    const classes = `kb-button ${bs ? 'kb-backspace' : ''} ${cr ? 'kb-return' : ''}`;
    const width = cr ? 100 / _state.kbScale : bs ? 60 : 36;
</script>

<div class={classes} style="width: {width}px">
    <span style='display: grid'>
        {#if label === bs}
            <img src='src/Images/Erase.webp' alt="erase" width={27} />
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
        width: 36px;
        height: 50px;
        font-size: 20px;
        background: #000000C0;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
        box-shadow: 1px 1px 1px black;
    }

    .kb-button:hover {
        background: #000000A0;
    }

    .kb-backspace {
        width: 60px;
    }

    .kb-return {
        width: 100px;
        font-size: 16px;
    }
</style>
