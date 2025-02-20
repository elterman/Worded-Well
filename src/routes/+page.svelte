<script>
  import { windowSize } from '../utils';

  let width = $state(0);

  $effect(() => {
    const onResize = () => {
      const { x: wx } = windowSize();
      width = Math.min(wx * 0.9, 360);
    };

    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });
</script>

<div class="app">
  <img src="../src/Images/Title.webp" alt="" {width} />
  <img src="../src/Images/Intro.webp" alt="" {width} />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  .app {
    display: grid;
    background: #403c38;
    background-image: url("../src/Images/Stone Wall.webp");
    background-size: 150px;
    height: 100vh;
    place-content: center;
  }
</style>
