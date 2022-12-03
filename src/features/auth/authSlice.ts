import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { LoginForm, RegisterForm } from '../../types/types.d';
import { emptyLogin, emptyRegister } from '../../util/consts';
export interface AuthState {
	logged: boolean;
	registerForm: RegisterForm;
	loginForm: LoginForm;
	actualPage: 'login' | 'register';
}

const initialState: AuthState = {
	logged: false,
	registerForm: { ...emptyRegister },
	loginForm: { ...emptyLogin },
	actualPage: 'login',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogged: (state, action: PayloadAction<AuthState['logged']>) => {
			const logged = action.payload;
			return { ...state, logged };
		},
		setRegister: (state, action: PayloadAction<Partial<AuthState['registerForm']>>) => {
			const registerForm = { ...state.registerForm, ...action.payload };
			return { ...state, registerForm };
		},
		setLogin: (state, action: PayloadAction<Partial<AuthState['loginForm']>>) => {
			const loginForm = { ...state.loginForm, ...action.payload };
			return { ...state, loginForm };
		},
		resetRegister: state => {
			return { ...state, registerForm: { ...emptyRegister } };
		},
		resetLogin: state => {
			return { ...state, loginForm: { ...emptyLogin } };
		},
		setPage: (state, action: PayloadAction<AuthState['actualPage']>) => {
			const actualPage = action.payload;
			return { ...state, actualPage };
		},
	},
});

export default authSlice.reducer;
export const { setLogged, setRegister, setLogin, resetRegister, resetLogin, setPage } = authSlice.actions;
