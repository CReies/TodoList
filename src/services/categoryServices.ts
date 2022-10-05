import axios from 'axios';
import { API_URL } from '../.env/config';
import { emptyCategory } from '../util/consts';
import type { ICategory } from '../util/types';

type Categories = ICategory[];

const baseUrl = `${API_URL}/categories`;
const LS = localStorage;
const LSData = LS.getItem('categories');

let LSDataParsed: Categories;
if (LSData != null) LSDataParsed = JSON.parse(LSData);

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const updateLS = (categories: Categories): void => {
	try {
		LS.setItem('categories', JSON.stringify(categories));
	} catch (e) {
		console.log(e);
	}
};

export const getAllCategories = async (): Promise<Categories> => {
	try {
		if (LSData != null) return LSDataParsed;

		const categories: Categories = await (await axios.get(baseUrl)).data;

		if (categories == null) throw Error(errors.Server);

		updateLS(categories);
		return categories;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getOneCategory = async (id: ICategory['_id']): Promise<ICategory> => {
	try {
		let category: ICategory | undefined;
		if (LSData != null) {
			category = LSDataParsed.find(category => category._id === id);
		} else {
			category = await (await axios.get(`${baseUrl}/${id}`)).data;
		}

		if (category == null) throw Error("Category doesn't exist");

		return category;
	} catch (e) {
		console.error(e);
		return emptyCategory;
	}
};

export const createCategory = async (newCategory: ICategory): Promise<void> => {
	try {
		await axios.post(baseUrl, newCategory);

		if (LSData == null) throw Error(errors.LS);

		const categoriesUpdated = LSDataParsed.concat(newCategory);
		updateLS(categoriesUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const deleteCategory = async (id: ICategory['_id']): Promise<void> => {
	try {
		void axios.delete(`${baseUrl}/${id}`);

		if (LSData == null) throw Error(errors.LS);

		const categoriesUpdated = LSDataParsed.filter(category => category._id !== id);
		updateLS(categoriesUpdated);
	} catch (e) {
		console.error(e);
	}
};
