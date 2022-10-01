export const d = document;
export const $ = (selector: string) =>
	d.querySelector(selector) as HTMLElement | null;
export const $$ = (selector: string) =>
	d.querySelectorAll(selector) as NodeList | null;
