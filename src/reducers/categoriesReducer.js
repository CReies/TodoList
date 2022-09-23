import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isloading: false,
	activeCategory: '',
	categories: [
		{
			_id: '0',
			title: 'uncategorized',
			description: 'Testing category',
			color: '#6e6e6e',
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
			createdAt: '2022-09-17T00:57:46.910Z',
			__v: 9,
		},
		{
			_id: '632cd7f2bd0c827e0b063c37',
			title: 'test',
			description: 'Testing category',
			color: '#6e6e6e',
			tasks: [],
			createdAt: '2022-09-22T21:47:30.092Z',
			__v: 0,
		},
	],
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			const categories = action.payload;
			return { ...state, categories };
		},

		addCategory: (state, action) => {
			const categories = state.categories.concat(action.payload);
			return { ...state, categories };
		},

		deleteCategory: (state, action) => {
			const categories = state.categories.filter(
				(category) => category.id !== action.payload
			);
			return { ...state, categories };
		},

		toggleLoading: (state) => {
			return { ...state, isloading: !isloading };
		},

		setActiveCategory: (state, action) => {
			return { ...state, activeCategory: action.payload };
		},
	},
});

export default categorySlice.reducer;
export const {
	setCategories,
	addCategory,
	deleteCategory,
	toggleLoading,
	setActiveCategory,
} = categorySlice.actions;
