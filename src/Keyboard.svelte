<script>
    import { BACKSPACE } from './const';
    import KeyboardButton from './Keyboard Button.svelte';
    import { _state } from './shared.svelte';
</script>

<div class="keyboard" style={`transform: scaleX(${_state.kbScale})`}>
    <div class="kb-row">
        {#each 'QWERTYUIOP' as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
    <div class="kb-row">
        {#each 'ASDFGHJKL' as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
    <div class="kb-row" style={{ transform: 'translateX(10px)' }}>
        {#each `ZXCVBNM${BACKSPACE}` as ch (ch)}
            <KeyboardButton {ch} />
        {/each}
    </div>
    <!-- <div class="kb-row">
        <KeyboardButton ch={RETURN} />
    </div> -->
</div>

<style>
    .keyboard {
        justify-self: center;
        grid-area: 5/1;
        display: grid;
        justify-items: center;
        font-family: Roboto;
        font-weight: bold;
        place-content: center;
        gap: 8px;
        color: white;
        text-shadow: 1px 1px 1px black;
    }

    .kb-row {
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        gap: 4.44px;
    }
</style>
