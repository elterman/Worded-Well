<script>
    import { fade } from 'svelte/transition';
    import { _score } from './state.svelte';
</script>

{#if _score.gain}
    <div class="gain" transition:fade={{ duration: 300 }} style="transform: translateY({_score.gain.drop}px)">
        {`+${_score.gain.points}`}
    </div>
{/if}

<style>
    .gain {
        grid-area: 3/1;
        z-index: 100;
        place-self: start center;
        margin-bottom: -7px;
        font-family: Amnestia;
        font-size: 28px;
        color: #000000d8;
        filter: drop-shadow(0 0 3px white);
        --color: #ffe4ad;
        text-shadow:
            #fff 0px 0px 5px,
            #fff 0px 0px 10px,
            #fff 0px 0px 15px,
            var(--color) 0px 0px 20px,
            var(--color) 0px 0px 30px,
            var(--color) 0px 0px 40px,
            var(--color) 0px 0px 50px,
            var(--color) 0px 0px 75px;
    }
</style>
