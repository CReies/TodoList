import axios from 'axios';
import { API_URL } from '../.env/config';

const LS = localStorage;
const LSData = JSON.parse(LS.getItem('categories'));
const baseUrl = `${API_URL}/categories`;

const errorMessage = 'Something went wrong';

const updateLS = (categories) => {
	LS.setItem('categories', JSON.stringify(categories));
};

const services = {
	getAllcategories: async () => {
		try {
			if (LSData) return LSData;
			const categories = await axios.get(baseUrl);
			updateLS(categories);
			return categories;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},

	getOnecategory: async (id) => {
		try {
			const category =
				(LSData && LSData.filter((category) => category._id === id)) ||
				(await axios.get(`${baseUrl}/${id}`));

			return category;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},

	createcategory: async (newcategory) => {
		try {
			const res = await axios.post(baseUrl, newcategory);

			const categoriesUpdated = LSData.concat(newcategory);
			updateLS(categoriesUpdated);

			return res;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},

	deletecategory: async (id) => {
		try {
			const res = await axios.delete(`${baseUrl}/${id}`);

			const categoriesUpdated = LSData.filter((category) => category.id !== id);
			updateLS(categoriesUpdated);

			return res;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},

	completecategory: async (id) => {
		try {
			const res = await axios.put(`${baseUrl}/complete/${id}`);

			const categoriesUpdated = LSData.map((category) => {
				if (category.id === id) category.complete = true;
				return category;
			});
			updateLS(categoriesUpdated);

			return res;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},

	uncompletecategory: async (id) => {
		try {
			const res = await axios.put(`${baseUrl}/uncomplete/${id}`);

			const categoriesUpdated = LSData.map((category) => {
				if (category.id === id) category.complete = false;
				return category;
			});
			updateLS(categoriesUpdated);

			return res;
		} catch (e) {
			console.error(e);
			return errorMessage;
		}
	},
};

export default services;
