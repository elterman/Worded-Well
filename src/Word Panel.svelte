<script>
    import Letter from './Letter.svelte';
    import { _state } from './shared.svelte';

    let { chars } = $props();
    const area = chars ? 'auto' : '4/1';
    const gap = chars ? 0 : '4px';
    chars = chars || _state.input;
</script>

<div class="word-panel" style="grid-area: {area}">
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
