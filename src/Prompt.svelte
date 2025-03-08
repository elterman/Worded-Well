<script>
    import { Motion } from 'svelte-motion';
    import { PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_START, PROMPT_SURRENDER, X } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { _prompt, _sob, onResetStats, onStart, onSurrender } from './shared.svelte';

    const id = $derived(_prompt.id);

    const onAnimationComplete = () => {
        if (_prompt.opacity > 0) {
            return;
        }

        let id = null;

        if (!_sob.game_on) {
            id = PROMPT_START;
        } else if (_sob.over) {
            id = PROMPT_PLAY_AGAIN;
        }

        if ((_prompt.id = id)) {
            _prompt.opacity = 1;
        }
    };
</script>

{#if id}
    <Motion
        animate={{ opacity: _prompt.opacity, transform: `scale(${_prompt.opacity})` }}
        transition={{ type: 'spring', damping: 15 }}
        {onAnimationComplete}
        let:motion
    >
        <div class="prompt {_sob.game_on ? '' : 'area'}" use:motion>
            {#if id === PROMPT_START}
                <PromptPanel ops={[{ label: PROMPT_START, onClick: onStart }]} />
            {:else if id === PROMPT_PLAY_AGAIN}
                <PromptPanel ops={[{ label: PROMPT_PLAY_AGAIN, onClick: onStart }]} />
            {:else if id === PROMPT_SURRENDER}
                <PromptPanel ops={[{ label: PROMPT_SURRENDER, onClick: onSurrender }, { label: X }]} />
            {:else if id === PROMPT_RESET_STATS}
                <PromptPanel ops={[{ label: PROMPT_RESET_STATS, onClick: onResetStats }, { label: X }]} />
            {/if}
        </div>
    </Motion>
{/if}

<style>
    .prompt {
        grid-area: 4/1;
        place-self: center;
        transform: scale(0);
        z-index: 1;
    }

    .area {
        grid-area: 3/1;
    }
</style>
