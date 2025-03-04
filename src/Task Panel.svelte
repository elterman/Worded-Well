<script>
    import { fade } from 'svelte/transition';
    import Letter from './Letter.svelte';
    import { _sob, nextTask } from './shared.svelte';

    let { task, index = null } = $props();

    const dropHeight = $derived.by(() => (index === 0 && !_sob.timer ? _sob.surrender_drop : -1));

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.propertyName === 'opacity' && e.target.id === task.problem && task.solved) {
                nextTask(true);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const drop = (node, { duration, x = 0, y = 0 } = {}) => {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;

        const split_css_unit = (value) => {
            const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
            return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
        };

        const [x_value, x_unit] = split_css_unit(x);
        const [y_value, y_unit] = split_css_unit(y);

        console.log({ x_value, x_unit, y_value, y_unit });

        return {
            duration,
            css: (t) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit})`,
        };
    };
</script>

<div
    class="task-panel"
    id={task.problem}
    style="z-index: {index || 0}; opacity: {task?.solved ? 0 : 1}"
    in:drop={{ y: dropHeight < 0 ? 0 : -dropHeight, duration: dropHeight < 0 ? 0 : 500 }}
    out:fade={{ duration: _sob.timer === null ? 0 : 500 }}
>
    {#each task.problem as ch, i (i)}
        <Letter {ch} />
    {/each}
</div>

<style>
    .task-panel {
        display: grid;
        place-content: center;
        grid-auto-flow: column;
        transition: opacity 1500ms;
    }
</style>
