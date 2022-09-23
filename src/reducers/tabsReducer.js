import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 'Category' };

const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTabsValue: (state, action) => {
			return { ...state, value: action.payload };
		},
	},
});

export default tabsSlice.reducer;
export const { setTabsValue } = tabsSlice.actions;
