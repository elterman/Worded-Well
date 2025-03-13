<script>
    import { fade } from 'svelte/transition';
    import { _sob } from './state.svelte';
    import { tapOrClick } from './shared.svelte';

    export const onClick = () => {
        _sob.lookup_prompt = false;
    };
</script>

{#if _sob.over && _sob.lookup_prompt}
    <div class="prompt" transition:fade onpointerdown={onClick}>
        <span class="gradient-text">{`${tapOrClick()} on a word to look up its definition`}</span>
    </div>
{/if}

<style>
    .prompt {
        z-index: 1;
        place-self: center;
        grid-area: 5/1;
        background: #000000c0;
        font-family: Amnestia;
        font-size: 12px;
        padding: 8px 12px 5px;
        border-radius: 50vh;
        justify-items: center;
        cursor: pointer;
    }

    span {
        line-height: 1.5em;
    }
</style>
