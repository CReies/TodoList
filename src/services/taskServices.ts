import axios from 'axios';
import { API_URL } from '../.env/config';
import { emptyTask } from '../util/consts';
import type { ITask } from '../util/types';

type Tasks = ITask[];

const baseUrl = `${API_URL}/tasks`;
const LS = localStorage;
const LSData = LS.getItem('tasks');

let LSDataParsed: Tasks | undefined;
if (LSData != null) LSDataParsed = JSON.parse(LSData);

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const updateLS = (tasks: Tasks): void => {
	LS.setItem('tasks', JSON.stringify(tasks));
};

export const getAllTasks = async (): Promise<Tasks> => {
	try {
		if (LSDataParsed != null) return LSDataParsed;

		const tasks: Tasks = await (await axios.get(baseUrl)).data;
		if (tasks == null) throw Error(errors.Server);

		updateLS(tasks);
		return tasks;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getOneTask = async (id: ITask['_id']): Promise<ITask> => {
	try {
		let task: ITask | undefined;
		if (LSDataParsed != null) {
			task = LSDataParsed.find(task => task._id === id);
		} else {
			task = await (await axios.get(`${baseUrl}/${id}`)).data;
		}

		if (task == null) throw Error("Task doesn't exist");

		return task;
	} catch (e) {
		console.error(e);
		return emptyTask;
	}
};

export const createTask = async (newTask: ITask): Promise<void> => {
	try {
		await axios.post(baseUrl, newTask);

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.concat(newTask);
		updateLS(tasksUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const deleteTask = async (id: ITask['_id']): Promise<void> => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.filter((task: ITask) => task._id !== id);
		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};

export const completeTask = async (id: ITask['_id']): Promise<void> => {
	try {
		const res = await (await axios.put(`${baseUrl}/complete/${id}`)).data;

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: true };
			return task;
		});

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};

export const uncompleteTask = async (id: ITask['_id']): Promise<void> => {
	try {
		const res = await (await axios.put(`${baseUrl}/uncomplete/${id}`)).data;

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: false };
			return task;
		});

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};
