<script>
    import Back from '$lib/images/Back.webp';
    import Easy from '$lib/images/Easy.webp';
    import Hard from '$lib/images/Hard.webp';
    import ResetStats from '$lib/images/Reset Stats.webp';
    import Surrender from '$lib/images/Surrender.webp';
    import SoundOff from '$lib/images/Sound Off.webp';
    import SoundOn from '$lib/images/Sound On.webp';
    import ToolButton from './Tool Button.svelte';
    import { PROMPT_RESET_STATS, PROMPT_SURRENDER, START_PAGE } from './const';
    import { killTimer, makePool } from './shared.svelte';
    import { _prompt, _sob, _stats } from './state.svelte';
    import { _sound, playSound } from './sound.svelte';

    const onBack = () => {
        _sob.page = START_PAGE;
        killTimer();
    };

    const onSurrender = () => {
        if (_prompt.id == PROMPT_SURRENDER) {
            _prompt.opacity = 0;
            return;
        }

        playSound('plop');

        _prompt.id = PROMPT_SURRENDER;
        _prompt.opacity = 1;
    };

    const onResetStats = () => {
        if (_prompt.id == PROMPT_RESET_STATS) {
            _prompt.opacity = 0;
            return;
        }

        playSound('plop');

        _prompt.id = PROMPT_RESET_STATS;
        _prompt.opacity = 1;
    };

    const onSounds = () => {
        _sound.on = !_sound.on;

        if (_sound.on) {
            playSound('won', { rate: 4 });
        }
    };

    const onMode= () => {
        playSound('plop');
        _sob.easy = !_sob.easy;
        makePool();
    };

    const tooltip = $derived(`${_sob.easy ? 'less' : 'more'} difficult`);

    const canResetStats = $derived(_stats.plays > 1 || (_stats.plays === 1 && (!_sob.game_on || _sob.over)));
</script>

<div class="toolbar">
    <ToolButton src={Back} onClick={onBack} />
    <ToolButton src={Surrender} onClick={onSurrender} disabled={_sob.over || !_sob.game_on} />
    <ToolButton src={_sob.easy ? Easy : Hard} onClick={onMode} tooltip={tooltip}/>
    <ToolButton src={ResetStats} onClick={onResetStats} disabled={!canResetStats} />
    <ToolButton src={_sound.on ? SoundOn : SoundOff} onClick={onSounds} />
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
