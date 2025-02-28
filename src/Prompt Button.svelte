<script>
    import { X } from './const';
    import { _prompt } from './shared.svelte';

    const { op } = $props();

    let scale = $state(1);
    const width = op.label === X ? '36px' : 'auto';
    const style = $derived(`width: ${width}; transform: scale(${scale})`);

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.target.id !== op.label) {
                return;
            }

            if (scale < 1) {
                scale = 1;
            } else {
                setTimeout(op.onClick);
                _prompt.opacity = 0;
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });
</script>

<button id={op.label} class="button-base button" {style} onpointerdown={() => (scale = 0.8)}>
    {op.label}
</button>

<style>
    .button {
        font-family: Poppins;
        font-size: 17px;
        box-shadow: 0 0 5px black;
        height: 36px;
        border-radius: 18px;
        padding: 0 10px 1px;
    }

    .button:hover {
        background: white;
    }
</style>
