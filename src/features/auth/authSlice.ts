import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LoginForm, RegisterForm } from '../../types/types.d';
import { emptyLogin, emptyRegister } from '../../util/consts';
export interface AuthState {
	logged: boolean;
	registerForm: RegisterForm;
	loginForm: LoginForm;
}

const initialState: AuthState = {
	logged: false,
	registerForm: { ...emptyRegister },
	loginForm: { ...emptyLogin },
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogged: (state, action: PayloadAction<AuthState['logged']>) => {
			const logged = action.payload;
			return { ...state, logged };
		},
		setRegister: (state, action: PayloadAction<{ name: string; value: Partial<AuthState['registerForm']> }>) => {
			const registerForm = { ...state.registerForm, [action.payload.name]: action.payload.value };
			return { ...state, registerForm };
		},
		setLogin: (state, action: PayloadAction<{ name: string; value: Partial<AuthState['loginForm']> }>) => {
			const loginForm = { ...state.loginForm, [action.payload.name]: action.payload.value };
			return { ...state, loginForm };
		},
	},
});

export default authSlice.reducer;
export const { setLogged, setRegister, setLogin } = authSlice.actions;
