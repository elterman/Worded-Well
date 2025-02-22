<script>
  import Back from './Images/Back.webp';
  import Surrender from './Images/Surrender.webp';
  import ResetStats from './Images/Reset Stats.webp';
  import SoundOff from './Images/Sound Off.webp';
  import SoundOn from './Images/Sound On.webp';
  import ToolButton from './Tool Button.svelte';
  import { _state } from './shared.svelte';
</script>

<div class="toolbar">
  <ToolButton src={Back} />
  <ToolButton src={Surrender} />
  <ToolButton src={ResetStats} />
  <ToolButton src={_state.sounds ? SoundOn : SoundOff} />
</div>

<style>
  .toolbar {
    display: grid;
    grid-auto-flow: column;
    background: #000000C0;
  }
</style>
