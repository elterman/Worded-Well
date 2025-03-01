<script>
    import Letter from './Letter.svelte';

    let { chars } = $props();
</script>

<div class="word-panel">
    {#each chars as ch, i (i)}
        <Letter {ch} />
    {/each}
</div>

<style>
    .word-panel {
        display: grid;
        place-content: center;
        grid-auto-flow: column;
    }
</style>
