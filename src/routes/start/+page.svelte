<script>
  import { windowSize } from '../../utils';
  import { fade } from 'svelte/transition';

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

<div class="start-page" transition:fade>
  <img src="src/Images/Title.webp" alt="" {width} />
  <img src="src/Images/Intro.webp" alt="" {width} />
</div>

<style>
  .start-page {
    display: grid;
    gap: 50px;
    background-image: url('src/Images/Stone Wall.webp');
    background-size: 150px;
    height: 100vh;
    place-content: center;
    transition: opacity 0.5s;
  }
</style>
