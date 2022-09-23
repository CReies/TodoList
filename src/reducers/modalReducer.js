import { createSlice } from '@reduxjs/toolkit';

const initialState = { content: '', visible: false };

const modalSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		toggleModal: (state) => {
			return { ...state, visible: !state.visible };
		},
		setModalContent: (state, action) => {
			return { ...state, content: action.payload };
		},
	},
});

export default modalSlice.reducer;
export const { toggleModal, setModalContent } = modalSlice.actions;
