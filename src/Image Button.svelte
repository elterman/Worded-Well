<script>
    const { src, width, onClick, style } = $props();

    let scale = $state(1);

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
</script>

<button id={src} class="button" tabindex={-1} onpointerdown={() => (scale = 0.7)} style="transform: scale({scale})">
    <img {src} alt="" {width} {style} />
</button>

<style>
    .button {
        background: none;
        border: none;
        display: grid;
        place-content: center;
        cursor: pointer;
        transition: transform 0.1s;
        box-sizing: border-box;
    }

    .button:focus-visible {
        outline: none;
    }
</style>
