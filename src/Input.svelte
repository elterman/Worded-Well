<script>
    import Letter from './Letter.svelte';
    import { clientRect } from './utils';

    let width = $state(0);
    $effect(() => (width = clientRect('.game-page').width));
</script>

<div class="input-container" style="width: {width * 0.7}px">
    <div class="input" style="transform: scale(0.3)">
        <Letter ch="W" />
        <Letter ch="E" />
        <Letter ch="A" />
        <Letter ch="T" />
        <Letter ch="H" />
        <Letter ch="E" />
        <Letter ch="R" />
    </div>
</div>

<style>
    .input-container {
        grid-area: 4/1;
        display: grid;
        place-self: center;
        place-content: center;
        height: 40px;
    }

    .input {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    }
</style>
