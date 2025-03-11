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
        z-index: 100;
        width: 200px;
        padding: 8px 0 5px;
        justify-items: center;
        cursor: pointer;
    }

    span {
        background: -webkit-linear-gradient(#f3d97b, #df7842 150%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.5em;
    }
</style>
