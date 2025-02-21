<script>
  import { goto } from '$app/navigation';
  import { windowSize } from '../utils';

  let bmgWidth = $state(0);

  $effect(() => {
    setTimeout(() => {
      goto('/start', { replaceState: true });
    }, 2000);

    let { x: wx, y: wy } = windowSize();
    bmgWidth = Math.min(300, Math.min(wx, wy) * 0.6);
  });
</script>

<div class="app">
  <img src="src/Images/BMG.webp" alt="" width={bmgWidth} />
</div>

<style>
  :global(body) {
    margin: 0;
    background: #3B3732;
  }

  .app {
    display: grid;
    height: 100vh;
    background: #8A0000;
    place-content: center;
    color: white;
  }
</style>
