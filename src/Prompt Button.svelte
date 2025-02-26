<script>
    import { X } from './const';

    const { text } = $props();
    const width = text === X ? '36px' : 'unset';
</script>

<button class="button" style='width: {width}'>{text}</button>

<style>
    .button {
        grid-area: 3/1;
        place-self: center;
        display: grid;
        place-content: center;
        font-family: Fredoka;
        font-size: 18px;
        box-shadow: 0 0 5px black;
        background: radial-gradient(#ffffffe8, #ffffffe8 100%);
        border-style: solid;
        border-color: white silver silver white;
        box-sizing: border-box;
        color: #522d18;
        height: 36px;
        border-radius: 18px;
        padding: 0 10px 1px;
        cursor: pointer;
    }

    .button:hover {
        background: white;
    }
</style>
