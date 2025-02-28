<script>
    import Back from '$lib/images/Back.webp';
    import ResetStats from '$lib/images/Reset Stats.webp';
    import SoundOff from '$lib/images/Sound Off.webp';
    import SoundOn from '$lib/images/Sound On.webp';
    import Surrender from '$lib/images/Surrender.webp';
    import ToolButton from './Tool Button.svelte';
    import { PROMPT_RESET_STATS, PROMPT_SURRENDER, START_PAGE } from './const';
    import { _prompt, _state } from './shared.svelte';

    const onBack = () => (_state.page = START_PAGE);

    const onSurrender = () => {
        if (_prompt.id == PROMPT_SURRENDER) {
            _prompt.opacity = 0;
            return;
        }

        _prompt.id = PROMPT_SURRENDER;
        _prompt.opacity = 1;
    };

    const onResetStats = () => {
        if (_prompt.id == PROMPT_RESET_STATS) {
            _prompt.opacity = 0;
            return;
        }

        _prompt.id = PROMPT_RESET_STATS;
        _prompt.opacity = 1;
    };
</script>

<div class="toolbar">
    <ToolButton src={Back} onClick={onBack} />
    <ToolButton src={Surrender} onClick={onSurrender} />
    <ToolButton src={ResetStats} onClick={onResetStats} />
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
    }
</style>
