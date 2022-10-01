import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TabsState {
	value: string;
	data: Array<string>;
}
const initialState: TabsState = { value: 'Category', data: [] };

const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTabsValue: (state, action: PayloadAction<TabsState['value']>) => {
			const value = action.payload;
			return { ...state, value };
		},
		setTabs: (state, action: PayloadAction<TabsState['data']>) => {
			const tabs = action.payload;
			return { ...state, tabs };
		},
		addTab: (state, action: PayloadAction<string>) => {
			const tabs = state.data.concat(action.payload);
			return { ...state, tabs };
		},
	},
});

export default tabsSlice.reducer;
export const { setTabsValue, setTabs, addTab } = tabsSlice.actions;
