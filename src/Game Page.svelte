<script>
  import { START_PAGE } from './const';
  import { _state } from './shared.svelte';
  import Toolbar from './Toolbar.svelte';

  const onBack = () => (_state.page = START_PAGE);
</script>

<div class="game-page">
  <button onclick={onBack} style="font-family: Fredoka">GAME PAGE</button>
  <Toolbar />
</div>

<style>
  .game-page {
    grid-area: 1/1;
    display: grid;
    background-image: url('src/Images/Stone Wall.webp');
    background-size: 150px;
    place-content: center;
  }
</style>
