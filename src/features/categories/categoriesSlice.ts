import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICategory } from '../../util/types';

export interface CategoriesState {
	isLoading: boolean;
	activeCategory: string;
	newCategory: ICategory;
	data: Array<ICategory>;
}

const initialState: CategoriesState = {
	isLoading: false,
	activeCategory: '',
	newCategory: {
		_id: '',
		title: '',
		color: '#6e6e6e',
		tasks: [],
	},
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

		setNewCategory: (
			state,
			action: PayloadAction<{
				name: string;
				value: string | boolean | ICategory['_id'];
			}>
		) => {
			const newCategory = {
				...state.newCategory,
				[action.payload.name]: action.payload.value,
			};
			return { ...state, newCategory };
		},

		resetNewCategory: (state) => {
			const newCategory = { ...initialState.newCategory };
			return { ...state, newCategory };
		},

		setCategoriesLoading: (
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
	setNewCategory,
	resetNewCategory,
	setCategoriesLoading,
	setActiveCategory,
} = categorySlice.actions;
