<script>
    import Toolbar from './Toolbar.svelte';
</script>

<div class="game-page">
    <Toolbar />
</div>

<style>
    .game-page {
        grid-area: 1/1;
        display: grid;
        background-image: url('src/Images/Stone Wall.webp');
        background-size: 150px;
        place-content: end center;
    }
</style>
