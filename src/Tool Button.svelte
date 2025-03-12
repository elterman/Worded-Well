<script>
    import { fade } from 'svelte/transition';
    import { later } from './utils';

    const { src, width = 40, disabled, onClick, tooltip } = $props();

    let scale = $state(1);
    let tip = $state(false);
    let timer1 = $state(null);
    let timer2 = $state(null);
    let timer3 = $state(false);

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

            if (timer1 || timer2) {
                return;
            }

            timer1 = later(() => {
                timer1 = null;
                tip = true;

                timer2 = later(() => {
                    timer2 = null;
                    tip = false;
                }, 1500);
            });
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => {
        if (timer3) {
            return;
        }

        scale = 0.7;

        timer3 = later(() => (timer3 = null), 500);
    };
</script>

<button id={src} class={classes} tabindex={-1} onpointerdown={onPointerDown} {style}>
    {#if tooltip && tip}
        <div class="tooltip" transition:fade>
            <span class="gradient-text">{tooltip}</span>
        </div>
    {/if}
    <img class={disabled ? 'img-disabled' : 'img'} {src} alt="" {width} />
</button>

<style>
    .button {
        place-self: center;
        border-radius: 5px;
        box-shadow: 2px 2px 3px black;
        display: grid;
        place-items: center;
    }

    .disabled {
        cursor: initial;
        pointer-events: none;
    }

    .button:focus {
        outline: none !important;
    }

    .img,
    .img-disabled {
        grid-area: 1/1;
    }

    .img-disabled {
        filter: sepia(1);
        opacity: 0.6;
    }

    .tooltip {
        grid-area: 1/1;
        display: grid;
        border: none;
        background: #202020;
        font-family: Amnestia;
        font-size: 12px;
        padding: 8px 12px 5px;
        border-radius: 50vh;
        transform: translateY(-190%);
    }
</style>
