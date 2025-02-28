<script>
    import { X } from './const';

    const { op } = $props();
    const width = op.label === X ? '36px' : 'auto';
</script>

<button class="button" style="width: {width}" onclick={op.onClick}>{op.label}</button>

<style>
    .button {
        display: grid;
        place-content: center;
        font-family: Poppins;
        font-size: 17px;
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
