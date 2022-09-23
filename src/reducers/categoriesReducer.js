import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	activeCategory: '',
	data: [],
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			const data = action.payload;
			return { ...state, data };
		},

		addCategory: (state, action) => {
			const data = state.data.concat(action.payload);
			return { ...state, data };
		},

		deleteCategory: (state, action) => {
			const data = state.data.filter(
				(category) => category.id !== action.payload
			);
			return { ...state, data };
		},

		toggleCategoriesLoading: (state, action) => {
			return { ...state, isLoading: action.payload };
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
	toggleCategoriesLoading,
	setActiveCategory,
} = categorySlice.actions;
