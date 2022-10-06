import axios from 'axios';
import { API_URL } from '../.env/config';
import { emptyTask } from '../util/consts';
import { reloadLS, updateLS } from '../util/functions';
import type { ITask } from '../util/types';

type Tasks = ITask[];

const baseUrl = `${API_URL}/tasks`;
let LSDataParsed: Tasks | undefined;

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const reloadLSTasks = (): void => {
	LSDataParsed = reloadLS('tasks');
};

const updateLSTasks = (tasks: Tasks): void => {
	updateLS('tasks', tasks);
};

export const getAllTasks = async (): Promise<Tasks> => {
	try {
		reloadLSTasks();

		if (LSDataParsed != null) return LSDataParsed;

		const tasks: Tasks = await (await axios.get(baseUrl)).data;

		if (tasks == null) throw Error(errors.Server);

		updateLSTasks(tasks);
		return tasks;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getOneTask = async (id: ITask['_id']): Promise<ITask> => {
	try {
		reloadLSTasks();

		let task: ITask | undefined;

		if (LSDataParsed != null) task = LSDataParsed.find(task => task._id === id);
		else task = await (await axios.get(`${baseUrl}/${id}`)).data;

		if (task == null) throw Error("Task doesn't exist");

		return task;
	} catch (e) {
		console.error(e);
		return { ...emptyTask };
	}
};

export const createTask = async (newTask: ITask): Promise<void> => {
	try {
		reloadLSTasks();
		await axios.post(baseUrl, newTask);

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.concat(newTask);
		updateLSTasks(tasksUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const deleteTask = async (id: ITask['_id']): Promise<void> => {
	try {
		reloadLSTasks();
		void axios.delete(`${baseUrl}/${id}`);

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.filter((task: ITask) => task._id !== id);
		updateLSTasks(tasksUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const completeTask = async (id: ITask['_id']): Promise<void> => {
	try {
		reloadLSTasks();
		void axios.put(`${baseUrl}/complete/${id}`);

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: true };
			return task;
		});

		updateLSTasks(tasksUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const uncompleteTask = async (id: ITask['_id']): Promise<void> => {
	try {
		reloadLSTasks();
		void axios.put(`${baseUrl}/uncomplete/${id}`);

		if (LSDataParsed == null) throw Error(errors.LS);

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: false };
			return task;
		});

		updateLSTasks(tasksUpdated);
	} catch (e) {
		console.error(e);
	}
};

reloadLSTasks();
