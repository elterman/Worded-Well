<script>
    const { src, width = 40, disabled, onClick } = $props();

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

    const btnClass = ['button', { disabled }];
</script>

<button
    id={src}
    class={btnClass}
    tabindex={-1}
    onpointerdown={onPointerDown}
    style="{style} transform: scale({scale})"
    {disabled}
>
    <img class={disabled ? 'img-disabled' : ''} {src} alt="" {width} />
</button>

<style>
    :root {
        --background: radial-gradient(#ffffffc0, #ffffffc0 100%);
    }

    .button {
        place-self: center;
        display: grid;
        place-content: center;
        cursor: pointer;
        transition: transform 0.1s;
        border-radius: 5px;
        box-shadow: 2px 2px 3px black;
        background: var(--background);
        border: 2px solid;
        border-color: white silver silver white;
        box-sizing: border-box;
    }

    .button:hover {
        background: #ffffffe0;
    }

    .disabled {
        cursor: initial;
    }

    .disabled:hover {
        background: var(--background);
    }

    .button:focus-visible {
        outline: none;
    }

    .img-disabled {
        filter: sepia(1);
        opacity: 0.6;
    }
</style>
