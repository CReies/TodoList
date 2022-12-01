import { LoginForm, RegisterForm } from '../types/types.d';
import type { ICategory, ITask } from '../types/types';

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

export const emptyLogin: LoginForm = {
	username: '',
	password: '',
};

export const emptyRegister: RegisterForm = {
	username: '',
	password: '',
	passwordConfirm: '',
};
