<script>
    const { src, width = 40, onClick } = $props();

    let scale = $state(1);
    const style = `width: ${width}px; height: ${width}px;`;

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.target.id !== src) {
                return;
            }

            if (scale < 1) {
                scale = 1;
            } else {
                setTimeout(onClick);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => (scale = 0.7);
</script>

<button id={src} class="button" tabindex={-1} onpointerdown={onPointerDown} style="{style} transform: scale({scale})">
    <img {src} alt="" {width} />
</button>

<style>
    .button {
        place-self: center;
        display: grid;
        place-content: center;
        cursor: pointer;
        transition: transform 0.1s;
        border-radius: 5px;
        box-shadow: 2px 2px 3px black;
        background: radial-gradient(#ffffffc0, #ffffffc0 100%);
        border: 2px solid;
        border-color: white silver silver white;
        box-sizing: border-box;
    }

    .button:hover {
        background: #ffffffe0;
    }

    .button:focus-visible {
        outline: none;
    }
</style>
