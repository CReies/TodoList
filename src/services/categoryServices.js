import axios from 'axios';
import { API_URL } from '../.env/config';

const LS = localStorage;
const LSData = JSON.parse(LS.getItem('categories'));
const baseUrl = `${API_URL}/categories`;

const errorMessage = 'Something went wrong';

const updateLS = (categories) => {
	LS.setItem('categories', JSON.stringify(categories));
};

const getAllCegories = async () => {
	try {
		if (LSData) return LSData;
		const categories = await (await axios.get(baseUrl)).data;
		updateLS(categories);
		return categories;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const getOneCategory = async (id) => {
	try {
		const category =
			(LSData && LSData.filter((category) => category._id === id)) ||
			(await (
				await axios.get(`${baseUrl}/${id}`)
			).data);

		return category;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const createCategory = async (newcategory) => {
	try {
		const res = await (await axios.post(baseUrl, newcategory)).data;

		const categoriesUpdated = LSData.concat(newcategory);
		updateLS(categoriesUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

const deleteCategory = async (id) => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;

		const categoriesUpdated = LSData.filter((category) => category.id !== id);
		updateLS(categoriesUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export { getAllCegories, getOneCategory, createCategory, deleteCategory };
