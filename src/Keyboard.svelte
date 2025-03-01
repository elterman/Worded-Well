<script>
    import { BACKSPACE, SPACE } from './const';
    import KeyboardButton from './Keyboard Button.svelte';
    import { clientRect } from './utils';

    let gap = $state(0);

    $effect(() => {
        const wx = clientRect('.game-page').width;
        const margins = 12;

        gap = (wx - margins) / 11 * 0.1;
    });
</script>

<div class="keyboard">
    <div class="kb-row" style='gap: {gap}px'>
        {#each 'QWERTYUIOP' as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
    <div class="kb-row" style='gap: {gap}px'>
        {#each 'ASDFGHJKL' as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
    <div class="kb-row" style='gap: {gap}px'>
        {#each `${SPACE}ZXCVBNM${BACKSPACE}` as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
</div>

<style>
    .keyboard {
        justify-self: center;
        grid-area: 5/1;
        display: grid;
        justify-items: center;
        place-content: center;
        gap: 8px;
        color: white;
        text-shadow: 1px 1px 1px black;
    }

    .kb-row {
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        /* gap: 4.44px; */
    }
</style>
