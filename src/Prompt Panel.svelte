<script>
    import PromptButton from './Prompt Button.svelte';

    const { ops } = $props();
</script>

<div class="prompt-panel">
    {#each ops as op, i (i)}
        <PromptButton {op} />
    {/each}
</div>

<style>
    .prompt-panel {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    }
</style>
