<script>
  import { fade } from 'svelte/transition';
  import { windowSize } from './utils';

  let bmgWidth = $state(0);

  $effect(() => {
    let { x: wx, y: wy } = windowSize();
    bmgWidth = Math.min(300, Math.min(wx, wy) * 0.6);
  });
</script>

<div class="splash" out:fade={{ duration: 300 }}>
  <img src="src/Images/BMG.webp" alt="" width={bmgWidth} />
</div>

<style>
  .splash {
    grid-area: 1/1;
    display: grid;
    background: #8a0000;
    background-image: radial-gradient(transparent, black 100%);
    place-content: center;
    color: white;
    z-index: 3;
  }
</style>
