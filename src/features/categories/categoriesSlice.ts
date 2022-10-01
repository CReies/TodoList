import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICategory } from '../../util/types';

export interface CategoriesState {
	isLoading: boolean;
	activeCategory: string;
	data: Array<ICategory>;
}

const initialState: CategoriesState = {
	isLoading: false,
	activeCategory: '',
	data: [],
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Array<ICategory>>) => {
			const data = action.payload;
			return { ...state, data };
		},

		addCategory: (state, action: PayloadAction<ICategory>) => {
			const data = state.data.concat(action.payload);
			return { ...state, data };
		},

		deleteCategory: (state, action: PayloadAction<ICategory['_id']>) => {
			const data = state.data.filter(
				(category) => category._id !== action.payload
			);
			return { ...state, data };
		},

		toggleCategoriesLoading: (
			state,
			action: PayloadAction<CategoriesState['isLoading']>
		) => {
			return { ...state, isLoading: action.payload };
		},

		setActiveCategory: (
			state,
			action: PayloadAction<CategoriesState['activeCategory']>
		) => {
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
