import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
	isLoading: false,
	search: '',
	newTask: { _id: v4(), title: '', description: '', category: '' },
	length: 3,
	data: [],
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			const data = action.payload;
			return { ...state, data };
		},

		addTask: (state, action) => {
			const data = state.data.concat(action.payload);
			return { ...state, data };
		},

		deleteTask: (state, action) => {
			const data = state.task.filter((task) => task.id !== action.payload);
			return { ...state, data };
		},

		toggleCompleteTask: (state, action) => {
			const id = action.payload;
			const data = state.data.map((task) => {
				if (id === task._id) {
					return { ...task, completed: !task.completed };
				}
				return task;
			});
			return { ...state, data };
		},

		toggleTasksLoading: (state, action) => {
			return { ...state, isLoading: action.payload };
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
