<script>
    import Letter from './Letter.svelte';
</script>

<div class="input" style='transform: scale({1})'>
    <Letter ch="W" />
    <Letter ch="E" />
    <Letter ch="A" />
    <Letter ch="T" />
    <Letter ch="H" />
    <Letter ch="E" />
    <Letter ch="R" />
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
