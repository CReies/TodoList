import { d, LS } from './consts';

export const $ = (selector: string): HTMLElement | null => d.querySelector(selector);
export const $$ = (selector: string): NodeList | null => d.querySelectorAll(selector);

export const reloadLS = (item: string): any | undefined => {
	const LSData = LS.getItem(item);

	if (LSData != null) return JSON.parse(LSData);
};

export const updateLS = (item: string, value: Object[]): void => {
	const valueString = JSON.stringify(value);
	LS.setItem(item, valueString);
};
