<script>
    import { PROMPT_PLAY, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_SURRENDER, X } from './const';
    import Prompt from './Prompt.svelte';
    import { _prompt, _state } from './shared.svelte';
    import { Motion } from 'svelte-motion';

    const id = $derived(_prompt.id);

    const onCancel = () => {};

    const onPlay = () => {
        _state.over = false;
        _state.game_on = true;
    };

    const onSurrender = () => {
        _state.over = true;

        setTimeout(() => {
            _prompt.id = PROMPT_PLAY_AGAIN;
            _prompt.opacity = 1;
        }, 500);
    };

    const onResetStats = () => {};

    const onAnimationComplete = () => {
        if (_prompt.opacity > 0) {
            return;
        }

        if (!_state.game_on) {
            _prompt.id = PROMPT_PLAY;
            _prompt.opacity = 1;

            return;
        }

        if (_state.over) {
            _prompt.id = PROMPT_PLAY_AGAIN;
            _prompt.opacity = 1;

            return;
        }

        _prompt.id = null;
    };
</script>

{#if id}
    <Motion
        animate={{ opacity: _prompt.opacity, transform: `scale(${_prompt.opacity})` }}
        transition={{ type: 'spring', damping: 15 }}
        {onAnimationComplete}
        let:motion
    >
        <div class="prompts" use:motion>
            {#if id === PROMPT_PLAY}
                <Prompt ops={[{ label: PROMPT_PLAY, onClick: onPlay }]} />
            {:else if id === PROMPT_PLAY_AGAIN}
                <Prompt ops={[{ label: PROMPT_PLAY_AGAIN, onClick: onPlay }]} />
            {:else if id === PROMPT_SURRENDER}
                <Prompt
                    ops={[
                        { label: PROMPT_SURRENDER, onClick: onSurrender },
                        { label: X, onClick: onCancel },
                    ]}
                />
            {:else if id === PROMPT_RESET_STATS}
                <Prompt
                    ops={[
                        { label: PROMPT_RESET_STATS, onClick: onResetStats },
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
