<script>
    import { fade } from 'svelte/transition';
    import Letter from './Letter.svelte';
    import { _stack, nextTask } from './shared.svelte';

    let { task, index = 0 } = $props();

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.propertyName === 'opacity' && e.target.id === task.problem && task.solved) {
                _stack.tasks.unshift(task);
                nextTask(true);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });
</script>

<div
    class="task-panel"
    id={task.problem}
    style="z-index: {index}; opacity: {task?.solved ? 0 : 1}"
    out:fade={{ duration: 500 }}
>
    {#each task.solution as ch, i (i)}
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
