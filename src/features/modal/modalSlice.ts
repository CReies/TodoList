import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
	content: string;
	visible: boolean;
}

const initialState: ModalState = { content: '', visible: false };

const modalSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<ModalState['visible']>) => {
			const visible = action.payload;
			return { ...state, visible };
		},
		setModalContent: (state, action: PayloadAction<ModalState['content']>) => {
			const content = action.payload;
			return { ...state, content };
		},
	},
});

export default modalSlice.reducer;
export const { toggleModal, setModalContent } = modalSlice.actions;
