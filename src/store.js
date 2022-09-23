import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasksReducer';
import modalReducer from './reducers/modalReducer';
import tabsReducer from './reducers/tabsReducer';
import categoriesReducer from './reducers/categoriesReducer';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		categories: categoriesReducer,
		modal: modalReducer,
		tabs: tabsReducer,
	},
});
