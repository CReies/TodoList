import axios from 'axios';
import { API_URL } from '../.env/config';
import { ITask } from '../util/types';

type Tasks = Array<ITask>;

const baseUrl = `${API_URL}/tasks`;
const LS = localStorage;
const LSData = LS.getItem('tasks') || false;

let LSDataParsed: Tasks;
if (LSData) LSDataParsed = JSON.parse(LSData);

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const updateLS = (tasks: Tasks) => {
	LS.setItem('tasks', JSON.stringify(tasks));
};

export const getAllTasks = async () => {
	try {
		if (LSData) return LSDataParsed;
		const tasks = await (await axios.get(baseUrl)).data;

		if (!tasks) throw errors.Server;

		updateLS(tasks);
		return tasks;
	} catch (e) {
		console.error(e);
	}
};

export const getOneTask = async (id: ITask['_id']) => {
	try {
		let task: ITask | undefined;
		if (LSData) {
			task = LSDataParsed.find((task) => task._id === id);
		} else {
			task = await (await axios.get(`${baseUrl}/${id}`)).data;
		}

		if (!task) throw "Task doesn't exist";

		return task;
	} catch (e) {
		console.error(e);
	}
};

export const createTask = async (newTask: ITask) => {
	try {
		const res = await (await axios.post(baseUrl, newTask)).data;

		if (!LSData) throw errors.LS;

		const tasksUpdated = LSDataParsed.concat(newTask);
		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};

export const deleteTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;

		if (!LSData) throw errors.LS;

		const tasksUpdated = LSDataParsed.filter((task: ITask) => task._id !== id);
		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};

export const completeTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.put(`${baseUrl}/complete/${id}`)).data;

		if (!LSData) throw errors.LS;

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

export const uncompleteTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.put(`${baseUrl}/uncomplete/${id}`)).data;

		if (!LSData) throw errors.LS;

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
