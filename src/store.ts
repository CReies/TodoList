import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import modalSlice from './features/modal/modalSlice';
import tabsSlice from './features/tabs/tabsSlice';
import categoriesSlice from './features/categories/categoriesSlice';

export const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		categories: categoriesSlice,
		modal: modalSlice,
		tabs: tabsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
