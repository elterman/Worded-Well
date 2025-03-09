<script>
    import { later } from "./utils";

    const { src, width = 40, disabled, onClick } = $props();

    let scale = $state(1);
    const classes = $derived(['button-base button', { disabled }]);
    const style = $derived(`width: ${width}px; height: ${width}px; transform: scale(${scale})`);

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.target.id !== src) {
                return;
            }

            if (scale < 1) {
                scale = 1;
            } else {
                later(onClick);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => (scale = 0.7);
</script>

<button id={src} class={classes} tabindex={-1} onpointerdown={onPointerDown} {style}>
    <img class={disabled ? 'img-disabled' : ''} {src} alt="" {width} />
</button>

<style>
    .button {
        place-self: center;
        border-radius: 5px;
        box-shadow: 2px 2px 3px black;
    }

    .disabled {
        cursor: initial;
        pointer-events: none;
    }

    .button:focus {
        outline: none !important;
    }

    .img-disabled {
        filter: sepia(1);
        opacity: 0.6;
    }
</style>
