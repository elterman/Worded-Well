export const windowSize = () => {
    const d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = e.clientWidth || g.clientWidth,
        y = e.clientHeight || g.clientHeight;

    return { x, y };
};

export const clientRect = selector => {
    const ob = document.querySelector(selector);
    const r = ob?.getBoundingClientRect();

    return r;
};

export const focusOnApp = () => {
    document.querySelector('.app')?.focus();
};

export const isAlpha = (char) => /^[a-z]$/i.test(char);

export const isMobile = () => /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera);