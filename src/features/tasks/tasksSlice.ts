import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITask } from '../../util/types';

interface TaskState {
	isLoading: boolean;
	search: string;
	newTask: ITask;
	data: Array<ITask>;
}

const initialState: TaskState = {
	isLoading: false,
	search: '',
	newTask: {
		_id: v4(),
		title: '',
		description: '',
		category: '',
		completed: false,
	},
	data: [],
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<TaskState['data']>) => {
			const data = action.payload;
			return { ...state, data };
		},

		addTask: (state, action: PayloadAction<ITask>) => {
			const data = state.data.concat(action.payload);
			return { ...state, data };
		},

		deleteTask: (state, action: PayloadAction<ITask['_id']>) => {
			const data = state.data.filter((task) => task._id !== action.payload);
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
			const newTask = {
				...state.newTask,
				[action.payload.name]: action.payload.value,
			};
			return { ...state, newTask };
		},

		resetNewTask: (state) => {
			const newTask = { ...initialState.newTask };
			return { ...state, newTask };
		},

		setSearch: (state, action) => {
			const search = action.payload;
			return { ...state, search };
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
