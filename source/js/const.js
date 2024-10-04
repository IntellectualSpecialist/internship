const desktopWidth = 1440;
const tabletWidth = 768;
const mobileWidthOnlyMediaQuery = window.matchMedia(`(max-width: ${tabletWidth - 1}px)`);
const tabletWidthMediaQuery = window.matchMedia(`(min-width: ${tabletWidth}px)`);
const tabletWidthOnlyMediaQuery = window.matchMedia(`(max-width: ${desktopWidth - 1}px)`);
const desktopWidthMediaQuery = window.matchMedia(`(min-width: ${desktopWidth}px)`);

export { desktopWidth, tabletWidth, mobileWidthOnlyMediaQuery, tabletWidthOnlyMediaQuery, tabletWidthMediaQuery, desktopWidthMediaQuery };
