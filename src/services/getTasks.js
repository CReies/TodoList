import { API_URL } from '../.env/config.js';

export const getTasks = async (page, limit) => {
	const response = await fetch(`${API_URL}/tasks`);
	return response.json();
};
