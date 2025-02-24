<script>
    import Back from './Images/Back.webp';
    import ResetStats from './Images/Reset Stats.webp';
    import SoundOff from './Images/Sound Off.webp';
    import SoundOn from './Images/Sound On.webp';
    import Surrender from './Images/Surrender.webp';
    import ToolButton from './Tool Button.svelte';
    import { START_PAGE } from './const';
    import { _state } from './shared.svelte';

    const onBack = () => (_state.page = START_PAGE);
</script>

<div class="toolbar">
    <ToolButton src={Back} onClick={onBack} />
    <ToolButton src={Surrender} />
    <ToolButton src={ResetStats} />
    <ToolButton src={_state.sounds ? SoundOn : SoundOff} />
</div>

<style>
    .toolbar {
        grid-area: 6/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        gap: 5px;
        /* border-radius: 5px; */
        /* background: #000000c0; */
    }
</style>
