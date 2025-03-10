<script>
    import { fade } from 'svelte/transition';
    import { _sob } from './shared.svelte';
    import { tapOrClick } from './utils';

    const onPointerDown = () => {
        _sob.lookup_prompt = false;
    };
</script>

{#if _sob.over && _sob.lookup_prompt}
    <button class="prompt" tabindex={-1} transition:fade onpointerdown={onPointerDown}>
        <span>{`${tapOrClick()} on a word to`}</span>
        <span>look up its definition</span>
    </button>
{/if}

<style>
    .prompt {
        place-self: center;
        grid-area: 3/1;
        display: grid;
        color: #ffe4ad;
        border: none;
        background: #000000c0;
        font-family: Amnestia;
        font-size: 12px;
        z-index: 200;
        width: 200px;
        padding: 8px 0 5px;
        justify-items: center;
        cursor: pointer;
    }
</style>
