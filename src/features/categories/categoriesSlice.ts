import { createSlice } from '@reduxjs/toolkit';
import { emptyCategory } from '../../util/consts';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICategory } from '../../util/types';

export interface CategoriesState {
	isLoading: boolean;
	activeCategory: string;
	newCategory: ICategory;
	data: ICategory[];
	activeDeleteMode: boolean;
}

const initialState: CategoriesState = {
	isLoading: false,
	activeCategory: '',
	newCategory: { ...emptyCategory },
	data: [],
	activeDeleteMode: false,
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<ICategory[]>) => {
			const data = action.payload;
			return { ...state, data };
		},

		addCategory: (state, action: PayloadAction<ICategory>) => {
			const data = state.data.concat(action.payload);
			return { ...state, data };
		},

		removeCategory: (state, action: PayloadAction<ICategory['_id']>) => {
			const data = state.data.filter(category => category._id !== action.payload);
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

		resetNewCategory: state => {
			return { ...state, newCategory: { ...emptyCategory } };
		},

		setCategoriesLoading: (state, action: PayloadAction<CategoriesState['isLoading']>) => {
			return { ...state, isLoading: action.payload };
		},

		setActiveCategory: (state, action: PayloadAction<CategoriesState['activeCategory']>) => {
			return { ...state, activeCategory: action.payload };
		},

		setDeleteMode: (state, action: PayloadAction<boolean>) => {
			return { ...state, activeDeleteMode: action.payload };
		},
	},
});

export default categorySlice.reducer;
export const {
	setCategories,
	addCategory,
	removeCategory,
	setNewCategory,
	resetNewCategory,
	setCategoriesLoading,
	setActiveCategory,
	setDeleteMode,
} = categorySlice.actions;
