<script>
    import { fade } from 'svelte/transition';
    import Letter from './Letter.svelte';
    import { _sob, nextTask } from './shared.svelte';
    import { quadIn } from 'svelte/easing';
    import { playSound } from './sound.svelte';

    let { task, index = null } = $props();

    const dropHeight = $derived.by(() => (index === 0 && !_sob.timer ? _sob.surrender_drop : -1));

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.propertyName === 'opacity' && e.target.id === task.word && task.solved) {
                nextTask(true);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const drop = (node, { duration, easing = quadIn, y = 0 } = {}) => {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;

        return {
            duration,
            easing,
            css: (t) => {
                return `transform: ${transform} translateY(${(1 - t) * (y || 0)}px)`;
            },
        };
    };

    const onDropStart = () => {
        if (_sob.surrender_drop) {
            setTimeout(() => playSound('drop', { rate: 1 }), 400);
        }
    };

    const onDropEnd = () => {
        _sob.surrender_drop = 0;
    };
</script>

<div
    class="task-panel"
    id={task.word}
    style="z-index: {index || 0}; opacity: {task?.solved ? 0 : 1}"
    in:drop={{ y: dropHeight < 0 ? 0 : -dropHeight, duration: dropHeight < 0 ? 0 : 500 }}
    out:fade={{ duration: _sob.surrender_drop ? 0 : 300 }}
    onintrostart={onDropStart}
    onintroend={onDropEnd}
>
    {#each task.cipher as index, i (index)}
        <Letter ch={task.word[index]} off={index - i} />
    {/each}
</div>

<style>
    .task-panel {
        display: grid;
        place-content: center;
        grid-auto-flow: column;
        transition: opacity 500ms;
    }
</style>
