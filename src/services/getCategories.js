import { API_URL } from '../.env/config';

export const getCategories = async () => {
	const response = await fetch(`${API_URL}/categories`);
	return response.json();
};
