<script>
    import Letter from './Letter.svelte';
    import { _sob } from './shared.svelte';
</script>

<div class="input-panel">
    {#each _sob.input as ch, i (i)}
        <Letter {ch} input/>
    {/each}
</div>

<style>
    .input-panel {
        grid-area: 4/1;
        display: grid;
        place-self: center;
        place-content: center;
        height: 40px;
        grid-auto-flow: column;
        gap: 4px;
    }
</style>
