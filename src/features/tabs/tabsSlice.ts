import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TabsState {
	value: string;
}
const initialState: TabsState = { value: 'Category' };

const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTabsValue: (state, action: PayloadAction<TabsState['value']>) => {
			const value = action.payload;
			return { ...state, value };
		},
	},
});

export default tabsSlice.reducer;
export const { setTabsValue } = tabsSlice.actions;
