import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
	isloading: false,
	search: '',
	newTask: { _id: v4(), title: '', description: '', category: '' },
	length: 3,
	tasks: [
		{
			_id: '632cc74809285a5423ef9739',
			title: 'sus',
			description: 'impostor',
			category: '0',
			completed: false,
			createdAt: '2022-09-22T20:36:24.526Z',
			__v: 0,
		},
		{
			_id: '632cc74b09285a5423ef973d',
			title: 'sus2',
			description: 'impostor',
			category: '0',
			completed: false,
			createdAt: '2022-09-22T20:36:27.780Z',
			__v: 0,
		},
		{
			_id: '632cc74f09285a5423ef9741',
			title: 'sus3',
			description: 'impostor',
			category: '0',
			completed: false,
			createdAt: '2022-09-22T20:36:31.748Z',
			__v: 0,
		},
	],
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			const tasks = action.payload;
			return { ...state, tasks };
		},

		addTask: (state, action) => {
			const tasks = state.tasks.concat(action.payload);
			return { ...state, tasks };
		},

		deleteTask: (state, action) => {
			const tasks = state.task.filter((task) => task.id !== action.payload);
			return { ...state, tasks };
		},

		toggleCompleteTask: (state, action) => {
			const id = action.payload;
			const tasks = state.tasks.map((task) => {
				if (task.id === id) {
					task.completed = !task.completed;
					return task;
				}
			});
			return { ...state, tasks };
		},

		toggleTasksLoading: (state) => {
			return { ...state, isloading: !isloading };
		},

		setNewTask: (state, action) => {
			return {
				...state,
				newTask: {
					...state.newTask,
					[action.payload.name]: action.payload.value,
				},
			};
		},

		resetNewTask: (state) => {
			return { ...state, newTask: {} };
		},

		setSearch: (state, action) => {
			return { ...state, search: action.payload };
		},
	},
});

export default taskSlice.reducer;
export const {
	setTasks,
	addTask,
	deleteTask,
	toggleCompleteTask,
	toggleTasksLoading,
	setNewTask,
	resetNewTask,
	setSearch,
} = taskSlice.actions;
