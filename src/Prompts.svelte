<script>
    import { PROMPT_PLAY, PROMPT_RESET_STATS, PROMPT_SURRENDER, X } from './const';
    import Prompt from './Prompt.svelte';
    import { _state } from './shared.svelte';
    import { Motion } from 'svelte-motion';

    const prompt = $derived(_state.prompt);

    const onAnimationComplete = () => {
        if (!_state.show_prompt) {
            _state.prompt = null;
        }
    };

    const onCancel = () => {
        _state.show_prompt = false;
    };

    const onPlay = () => {};

    const onSurrender = () => {};

    const onResetStats = () => {};
</script>

{#if prompt}
    <Motion
        animate={{ opacity: _state.show_prompt ? 1 : 0, transform: `scale(${_state.show_prompt ? 1 : 0})` }}
        transition={{ type: 'spring', damping: 15 }}
        {onAnimationComplete}
        let:motion
    >
        <div class="prompts" use:motion>
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
    </Motion>
{/if}

<style>
    .prompts {
        grid-area: 3/1;
        place-self: center;
        transform: scale(0);
    }
</style>
