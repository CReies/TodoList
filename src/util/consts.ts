import type { ICategory, ITask } from './types';

export const d = document;
export const LS = localStorage;

export const emptyTask: ITask = {
	_id: '',
	title: '',
	description: '',
	category: '0',
	completed: false,
};

export const emptyCategory: ICategory = {
	_id: '',
	title: '',
	color: '#6e6e6e',
	tasks: [],
};
