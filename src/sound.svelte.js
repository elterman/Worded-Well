import { Sound } from 'svelte-sound';
import click from '$lib/sounds/click.mp3';
import cluck from '$lib/sounds/cluck.mp3';
import coin1 from '$lib/sounds/coin1.mp3';
import coin2 from '$lib/sounds/coin2.mp3';
import coins from '$lib/sounds/coins.mp3';
import dice from '$lib/sounds/dice.mp3';
import draw from '$lib/sounds/draw.mp3';
import drop from '$lib/sounds/drop.mp3';
import link1 from '$lib/sounds/link1.mp3';
import link2 from '$lib/sounds/link2.mp3';
import lost from '$lib/sounds/lost.mp3';
import oops from '$lib/sounds/oops.mp3';
import player1wins from '$lib/sounds/player1wins.mp3';
import player2wins from '$lib/sounds/player2wins.mp3';
import score1 from '$lib/sounds/score1.mp3';
import score2 from '$lib/sounds/score2.mp3';
import tap from '$lib/sounds/tap.mp3';
import won from '$lib/sounds/won.mp3';

export const _sound = $state({
    on: true,
});

const sounds = {
    click: new Sound(click),
    cluck: new Sound(cluck),
    coin1: new Sound(coin1),
    coin2: new Sound(coin2),
    coins: new Sound(coins),
    dice: new Sound(dice),
    draw: new Sound(draw),
    drop: new Sound(drop),
    link1: new Sound(link1),
    link2: new Sound(link2),
    lost: new Sound(lost),
    oops: new Sound(oops),
    player1wins: new Sound(player1wins),
    player2wins: new Sound(player2wins),
    score1: new Sound(score1),
    score2: new Sound(score2),
    tap: new Sound(tap),
    won: new Sound(won),

    sound_on: new Sound(won, { rate: 4 }),
};

export const playSound = (id, options = {}) => {
    const { force, rate = 1 } = options;

    if (_sound.on || force) {
        sounds[id].play();
    }
};
