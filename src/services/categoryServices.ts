import axios from 'axios';
import { API_URL } from '../.env/config';
import type { ICategory } from '../util/types';

type Categories = Array<ICategory>;

const baseUrl = `${API_URL}/categories`;
const LS = localStorage;
const LSData = LS.getItem('categories') || false;

let LSDataParsed: Array<ICategory>;
if (LSData) LSDataParsed = JSON.parse(LSData);

const errorMessage = 'Something went wrong';

const updateLS = (categories: Categories) => {
	LS.setItem('categories', JSON.stringify(categories));
};

export const getAllCegories = async () => {
	try {
		if (LSData) return LSDataParsed;
		const categories = await (await axios.get(baseUrl)).data;
		updateLS(categories);
		return categories;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const getOneCategory = async (id: ICategory['_id']) => {
	try {
		const category =
			(LSDataParsed &&
				LSDataParsed.filter((category) => category._id === id)) ||
			(await (
				await axios.get(`${baseUrl}/${id}`)
			).data);

		return category;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const createCategory = async (newcategory: ICategory) => {
	try {
		const res = await (await axios.post(baseUrl, newcategory)).data;

		const categoriesUpdated = LSDataParsed.concat(newcategory);
		updateLS(categoriesUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};

export const deleteCategory = async (id: ICategory['_id']) => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;

		const categoriesUpdated = LSDataParsed.filter(
			(category) => category._id !== id
		);
		updateLS(categoriesUpdated);

		return res;
	} catch (e) {
		console.error(e);
		return errorMessage;
	}
};
