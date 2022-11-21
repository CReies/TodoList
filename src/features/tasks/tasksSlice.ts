import { createSlice } from '@reduxjs/toolkit';
import { emptyTask } from '../../util/consts';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICategory, ITask } from '../../util/types';

interface TaskState {
	isLoading: boolean;
	search: string;
	newTask: ITask;
	data: ITask[];
}

const initialState: TaskState = {
	isLoading: false,
	search: '',
	newTask: { ...emptyTask },
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

		removeTask: (state, action: PayloadAction<ITask['_id']>) => {
			const data = state.data.filter(task => task._id !== action.payload);
			return { ...state, data };
		},

		setCompleteTask: (state, action: PayloadAction<{ id: ITask['_id']; completed: ITask['completed'] }>) => {
			const { id, completed } = action.payload;
			const data = state.data.map(task => {
				if (id === task._id) {
					return { ...task, completed };
				}
				return task;
			});
			return { ...state, data };
		},

		setTasksLoading: (state, action: PayloadAction<TaskState['isLoading']>) => {
			return { ...state, isLoading: action.payload };
		},

		setNewTask: (
			state,
			action: PayloadAction<{
				name: string;
				value: string | boolean | ICategory['_id'];
			}>
		) => {
			const newTask = {
				...state.newTask,
				[action.payload.name]: action.payload.value,
			};
			return { ...state, newTask };
		},

		resetNewTask: state => {
			return { ...state, newTask: { ...emptyTask } };
		},

		setSearch: (state, action: PayloadAction<TaskState['search']>) => {
			const search = action.payload;
			return { ...state, search };
		},
	},
});

export default taskSlice.reducer;
export const { setTasks, addTask, removeTask, setCompleteTask, setTasksLoading, setNewTask, resetNewTask, setSearch } =
	taskSlice.actions;
