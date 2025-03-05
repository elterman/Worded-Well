<script>
    import Letter from './Letter.svelte';
    import { _prompt, _sob } from './shared.svelte';
</script>

<div class="input-panel  {_prompt.opacity ? 'hidden' : ''}">
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
        transition: opacity 0.3s;
    }

    .hidden {
        opacity: 0;
    }
</style>
