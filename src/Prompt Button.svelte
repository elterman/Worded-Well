<script>
    import { X } from './const';
    import { _prompt } from './state.svelte';
    import { later } from './utils';

    const { op } = $props();

    let scale = $state(1);
    const x = $derived(op.label === X);
    const style = $derived(`transform: scale(${scale})`);

    $effect(() => {
        const onTransitionEnd = (e) => {
            if (e.target.id !== op.label) {
                return;
            }

            if (scale < 1) {
                scale = 1;
            } else {
                later(op.onClick);
                _prompt.opacity = 0;
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });
</script>

<div id={op.label} class={['button-base button', { x }]} {style} onpointerdown={() => (scale = 0.8)}>
    <span class="label">
        {op.label}
    </span>
</div>

<style>
    .button {
        font-family: Amnestia;
        font-size: 17px;
        box-shadow: 0 0 5px black;
        height: 36px;
        border-radius: 50vh;
        padding: 4px 15px 0px;
        filter: drop-shadow(0 0 1px black);
        background: radial-gradient(#ff8c00c0, #4c2c06 100%);
        border-width: 1px;
        border-color: #f3d97b #df7842 #df7842 #f3d97b;
    }

    .button:hover {
        background: radial-gradient(#ff8c00, #4c2c06 100%);
    }

    .label {
        background: -webkit-linear-gradient(#f3d97b, #df7842 125%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(1px 1px 1px black);
    }

    .x {
        aspect-ratio: 1;
        padding: 0;
    }
</style>
