<script>
    import Letter from './Letter.svelte';
    import { _state } from './shared.svelte';
</script>

<div class="input" style="transform: scale({1})">
    {#each _state.input as ch, i (i)}
        <Letter {ch} />
    {/each}
</div>

<style>
    .input {
        grid-area: 4/1;
        display: grid;
        place-self: center;
        place-content: center;
        height: 40px;
        grid-auto-flow: column;
        gap: 4px;
    }
</style>
