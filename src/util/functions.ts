import { ICategory, ITask } from '../types/types';
import { d, LS } from './consts';

export const $ = (selector: string): HTMLElement | null => d.querySelector(selector);
export const $$ = (selector: string): NodeList | null => d.querySelectorAll(selector);

export function reloadLS(item: 'categories'): ICategory[] | undefined;
export function reloadLS(item: 'tasks'): ITask[] | undefined;
export function reloadLS(item: 'categories' | 'tasks'): ICategory[] | ITask[] | undefined {
	const LSData = LS.getItem(item);

	if (LSData == null) return;
	return JSON.parse(LSData);
}

export const updateLS = (item: string, value: LSItem): void => {
	const valueString = JSON.stringify(value);
	LS.setItem(item, valueString);
};

type LSItem = ITask[] | ICategory[];
