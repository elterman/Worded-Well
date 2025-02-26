<script>
    import { PROMPT_PLAY, X } from './const';
    import Prompt from './Prompt.svelte';
    import { _state } from './shared.svelte';

    const prompt = $derived(_state.prompt);
</script>

{#if prompt}
    <div class="prompts">
        {#if prompt === PROMPT_PLAY}
            <Prompt ops={[prompt]} />
        {:else}
            <Prompt ops={[prompt, X]} />
        {/if}
    </div>
{/if}

<style>
    .prompts {
        grid-area: 3/1;
        place-self: center;
    }
</style>
