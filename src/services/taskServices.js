import axios from 'axios';
import { API_URL } from '../.env/config';

const LS = localStorage;
const LSData = JSON.parse(LS.getItem('tasks'));
const baseUrl = `${API_URL}/tasks`;

const errorMessage = 'Something went wrong';

const updateLS = (tasks) => {
	LS.setItem('tasks', JSON.stringify(tasks));
};

const getAllTasks = async () => {
	try {
		if (LSData) return LSData;
		const tasks = await axios.get(baseUrl);
		updateLS(tasks);
		return tasks;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const getOneTask = async (id) => {
	try {
		const task =
			(LSData && LSData.filter((task) => task._id === id)) ||
			(await axios.get(`${baseUrl}/${id}`));

		return task;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const createTask = async (newTask) => {
	try {
		const res = await axios.post(baseUrl, newTask);

		const tasksUpdated = LSData.concat(newTask);
		updateLS(tasksUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const deleteTask = async (id) => {
	try {
		const res = await axios.delete(`${baseUrl}/${id}`);

		const tasksUpdated = LSData.filter((task) => task.id !== id);
		updateLS(tasksUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const completeTask = async (id) => {
	try {
		const res = await axios.put(`${baseUrl}/complete/${id}`);

		const tasksUpdated =
			LSData &&
			LSData.map((task) => {
				if (task.id === id) task.complete = true;
				return task;
			});
		updateLS(tasksUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const uncompleteTask = async (id) => {
	try {
		const res = await axios.put(`${baseUrl}/uncomplete/${id}`);

		const tasksUpdated = LSData.map((task) => {
			if (task.id === id) task.complete = false;
			return task;
		});
		updateLS(tasksUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};
export {
	getAllTasks,
	getOneTask,
	createTask,
	deleteTask,
	completeTask,
	uncompleteTask,
};
