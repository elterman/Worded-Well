<script>
    import { dict } from '$lib/dict';
    import { shuffle } from 'lodash-es';
    import { Motion } from 'svelte-motion';
    import { PROMPT_PLAY, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_SURRENDER, X } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { _prompt, _sob, _stack, calcDrop, killTimer, onOver, startTimer } from './shared.svelte';

    const id = $derived(_prompt.id);

    const onPlay = () => {
        _sob.over = false;

        const scramble = (word) => {
            let problem = word;

            do {
                problem = shuffle(word);
            } while (problem === word);

            return problem;
        };

        _sob.task_pool = shuffle(dict.map((word) => ({ problem: scramble(word).join(''), solution: word })));
        _sob.task = _sob.task_pool.pop();
        _sob.ticks = 0;
        _stack.tasks = [];

        killTimer();

        setTimeout(() => {
            startTimer();
            _sob.game_on = true;
        }, 300);
    };

    const onSurrender = () => {
        _sob.surrender_drop = calcDrop({ surrendering: true }) - calcDrop();
        _stack.tasks.unshift(_sob.task);

        onOver();
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
        <div class="prompt {_sob.game_on ? '' : 'area'}" use:motion>
            {#if id === PROMPT_PLAY}
                <PromptPanel ops={[{ label: PROMPT_PLAY, onClick: onPlay }]} />
            {:else if id === PROMPT_PLAY_AGAIN}
                <PromptPanel ops={[{ label: PROMPT_PLAY_AGAIN, onClick: onPlay }]} />
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
