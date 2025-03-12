<script>
    import { fade } from 'svelte/transition';
    import { _sob } from './state.svelte';
    import { tapOrClick } from './utils';

    export const onClick = () => {
        _sob.lookup_prompt = false;
    };
</script>

{#if _sob.over  && _sob.lookup_prompt}
    <button class="prompt" tabindex={-1} transition:fade onclick={onClick}>
        <span class='gradient-text'>{`${tapOrClick()} on a word to`}</span>
        <span class='gradient-text'>look up its definition</span>
    </button>
{/if}

<style>
    .prompt {
        place-self: center;
        grid-area: 3/1;
        display: grid;
        border: none;
        background: #000000c0;
        font-family: Amnestia;
        font-size: 12px;
        z-index: 100;
        width: 200px;
        padding: 8px 0 5px;
        justify-items: center;
        cursor: pointer;
    }

    span {
        line-height: 1.5em;
    }
</style>
