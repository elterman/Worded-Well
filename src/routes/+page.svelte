<script>
  import { START_PAGE } from '../const';
  import { _state } from '../shared.svelte';
  import Splash from '../Splash.svelte';
  import StartPage from '../Start Page.svelte';
  import GamePage from '../Game Page.svelte';

  $effect(() => {
    const disable = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disable);
    return () => window.removeEventListener('contextmenu', disable);
  });

  let splash = $state(true);
  setTimeout(() => (splash = false), 2000);
</script>

<div class="app">
  <GamePage />

  {#if _state.page === START_PAGE}
    <StartPage />
  {/if}

  {#if splash}
    <Splash />
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    background: #3b3732;
    overflow: hidden;
  }

  @font-face {
    font-family: Fredoka;
    src: url('../Fonts/Fredoka.ttf');
  }

  .app {
    display: grid;
    height: 100vh;
  }
</style>
