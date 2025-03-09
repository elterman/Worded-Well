import sprite from '$lib/sounds/sprite.mp3';
import { Howl } from 'howler/dist/howler.core.min';
import { SPRITE } from './const';

export const _sound = $state({
    on: true,
});

const howl = new Howl({ src: [sprite], sprite: SPRITE });

export const playSound = (id, options = {}) => {
    const { rate = 1 } = options;

    if (_sound.on) {
        howl.play(id);
        howl.rate(rate);
    }
};
