export const d = document;
export const $ = (selector: string): HTMLElement | null => d.querySelector(selector);
export const $$ = (selector: string): NodeList | null => d.querySelectorAll(selector);
