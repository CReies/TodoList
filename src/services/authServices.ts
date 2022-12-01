import axios from 'axios';
import { LoginForm, RegisterForm } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_URL}/auth`;

export const login = async (user: LoginForm): Promise<string | undefined> => {
	try {
		const jwt = await (await axios.post(`${baseUrl}/login`, user)).data;
		return jwt;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const register = async (user: RegisterForm, _id: string): Promise<void> => {
	try {
		void axios.post(`${baseUrl}/register`, { ...user, _id });
	} catch (e) {
		console.error(e);
	}
};
