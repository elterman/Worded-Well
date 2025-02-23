<script>
    import { clientRect } from './utils';

    let width = $state(0);
    $effect(() => (width = clientRect('.app').width));
</script>

<div class="well" style="width: {300}px">
    <div class="background"></div>
    <div class="overlay"></div>
</div>

<style>
    .well {
        grid-area: 3/1;
        display: grid;
        place-self: center;
        height: 100%;
    }

    .overlay {
        grid-area: 1/1;
        background-image: linear-gradient(
            to right,
            #000000d0,
            #000000b0 25%,
            #000000a0,
            #000000a0,
            #000000b0 75%,
            #000000d0
        );
    }

    .background {
        grid-area: 1/1;
        background-image: url('src/Images/Stone Wall.webp');
        background-size: 25%;
    }
</style>
