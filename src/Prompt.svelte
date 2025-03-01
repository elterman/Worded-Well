<script>
    import { dict } from '$lib/dict';
    import { shuffle } from 'lodash-es';
    import { Motion } from 'svelte-motion';
    import { PROMPT_PLAY, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_SURRENDER, TICK_MS, X } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { _prompt, _sob, _stack } from './shared.svelte';

    const id = $derived(_prompt.id);

    const onCancel = () => {};

    const onPlay = () => {
        _sob.over = false;
        _sob.game_on = true;

        _stack.tasks = [];
        _sob.task_pool = shuffle(dict.map((w) => [w, shuffle(w).join('')]));
        _sob.task = _sob.task_pool.pop();
        _sob.ticks = 0;

        clearInterval(_sob.timer_id);
        _sob.timer_id = setInterval(() => (_sob.ticks += 1), TICK_MS);
    };

    const onSurrender = () => {
        _sob.over = true;

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

        let id = null;

        if (!_sob.game_on) {
            id = PROMPT_PLAY;
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
        <div class="prompt" use:motion>
            {#if id === PROMPT_PLAY}
                <PromptPanel ops={[{ label: PROMPT_PLAY, onClick: onPlay }]} />
            {:else if id === PROMPT_PLAY_AGAIN}
                <PromptPanel ops={[{ label: PROMPT_PLAY_AGAIN, onClick: onPlay }]} />
            {:else if id === PROMPT_SURRENDER}
                <PromptPanel
                    ops={[
                        { label: PROMPT_SURRENDER, onClick: onSurrender },
                        { label: X, onClick: onCancel },
                    ]}
                />
            {:else if id === PROMPT_RESET_STATS}
                <PromptPanel
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
    .prompt {
        grid-area: 3/1;
        place-self: center;
        transform: scale(0);
    }
</style>
