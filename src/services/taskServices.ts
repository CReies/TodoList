import axios from 'axios';
import { API_URL } from '../.env/config';
import { ITask } from '../util/types';

type Tasks = Array<ITask>;

const baseUrl = `${API_URL}/tasks`;
const LS = localStorage;
const LSData = LS.getItem('tasks') || false;

let LSDataParsed: Tasks;
if (LSData) LSDataParsed = JSON.parse(LSData);

const errorMessage = 'Something went wrong';

const updateLS = (tasks: Tasks) => {
	LS.setItem('tasks', JSON.stringify(tasks));
	console.log(tasks);
};

export const getAllTasks = async () => {
	try {
		if (LSData) return LSDataParsed;
		const tasks = await (await axios.get(baseUrl)).data;

		if (!tasks) return;

		updateLS(tasks);
		return tasks;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const getOneTask = async (id: ITask['_id']) => {
	try {
		const task =
			(LSDataParsed && LSDataParsed.filter((task: ITask) => task._id === id)) ||
			(await (
				await axios.get(`${baseUrl}/${id}`)
			).data);

		return task;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const createTask = async (newTask: ITask) => {
	try {
		const res = await (await axios.post(baseUrl, newTask)).data;
		const tasksUpdated = LSDataParsed.concat(newTask);

		if (!tasksUpdated) return;

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const deleteTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;
		const tasksUpdated = LSDataParsed.filter((task: ITask) => task._id !== id);

		if (!tasksUpdated) return;

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const completeTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.put(`${baseUrl}/complete/${id}`)).data;

		if (!LSData) return;

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: true };
			return task;
		});

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const uncompleteTask = async (id: ITask['_id']) => {
	try {
		const res = await (await axios.put(`${baseUrl}/uncomplete/${id}`)).data;

		if (!LSData) return;

		const tasksUpdated = LSDataParsed.map((task: ITask) => {
			if (task._id === id) return { ...task, completed: false };
			return task;
		});

		updateLS(tasksUpdated);
		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};
