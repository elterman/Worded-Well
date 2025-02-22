<script>
  import { START_PAGE } from './const';
  import { _state } from './shared.svelte';

  //   import '/static/index.css';
</script>

<div class="game-page">
  <button
    onclick={() => {
      _state.page = START_PAGE;
    }}
  >
    GAME PAGE
  </button>
</div>

<style>
  .game-page {
    grid-area: 1/1;
    display: grid;
    background-image: url('src/Images/Stone Wall.webp');
    background-size: 150px;
    place-content: center;
    font-family: Exo2;
  }
</style>
