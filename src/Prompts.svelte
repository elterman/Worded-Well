<script>
    import { PROMPT_PLAY, PROMPT_RESET_STATS, PROMPT_SURRENDER, X } from './const';
    import Prompt from './Prompt.svelte';
    import { _state } from './shared.svelte';

    const prompt = $derived(_state.prompt);

    const onCancel = () => {
        _state.prompt = null;
    };

    const onPlay = () => {};

    const onSurrender = () => {
    };

    const onResetStats = () => {
    };
</script>

{#if prompt}
    <div class="prompts">
        {#if prompt === PROMPT_PLAY}
            <Prompt ops={[{ label: prompt, onClick: onPlay }]} />
        {:else if prompt === PROMPT_SURRENDER}
            <Prompt
                ops={[
                    { label: prompt, onClick: onSurrender },
                    { label: X, onClick: onCancel },
                ]}
            />
        {:else if prompt === PROMPT_RESET_STATS}
            <Prompt
                ops={[
                    { label: prompt, onClick: onResetStats },
                    { label: X, onClick: onCancel },
                ]}
            />
        {/if}
    </div>
{/if}

<style>
    .prompts {
        grid-area: 3/1;
        place-self: center;
    }
</style>
