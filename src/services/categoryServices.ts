import axios from 'axios';
import { API_URL } from '../.env/config';
import type { ICategory } from '../util/types';

type Categories = Array<ICategory>;

const baseUrl = `${API_URL}/categories`;
const LS = localStorage;
const LSData = LS.getItem('categories') || false;

let LSDataParsed: Categories;
if (LSData) LSDataParsed = JSON.parse(LSData);

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const updateLS = (categories: Categories) => {
	try {
		LS.setItem('categories', JSON.stringify(categories));
	} catch (e) {
		console.log(e);
	}
};

export const getAllCategories = async () => {
	try {
		if (LSData) return LSDataParsed;

		const categories = await (await axios.get(baseUrl)).data;

		if (!categories) throw errors.Server;

		updateLS(categories);
		return categories;
	} catch (e) {
		console.error(e);
	}
};

export const getOneCategory = async (id: ICategory['_id']) => {
	try {
		let category: ICategory | undefined;
		if (LSData) {
			category = LSDataParsed.find((category) => category._id === id);
		} else {
			category = await (await axios.get(`${baseUrl}/${id}`)).data;
		}

		if (!category) throw "Category doesn't exist";

		return category;
	} catch (e) {
		console.error(e);
	}
};

export const createCategory = async (newCategory: ICategory) => {
	try {
		await axios.post(baseUrl, newCategory);

		if (!LSData) throw errors.LS;

		const categoriesUpdated = LSDataParsed.concat(newCategory);
		updateLS(categoriesUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const deleteCategory = async (id: ICategory['_id']) => {
	try {
		const res = await (await axios.delete(`${baseUrl}/${id}`)).data;

		if (!LSData) throw errors.LS;

		const categoriesUpdated = LSDataParsed.filter(
			(category) => category._id !== id
		);
		updateLS(categoriesUpdated);
		return res;
	} catch (e) {
		console.error(e);
	}
};
