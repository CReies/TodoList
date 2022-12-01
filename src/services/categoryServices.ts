import axios from 'axios';
import { emptyCategory, LS } from '../util/consts';
import { reloadLS, updateLS } from '../util/functions';
import type { ICategory } from '../types/types';

type Categories = ICategory[];

const API_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_URL}/categories`;
let LSDataParsed: Categories | undefined;

enum errors {
	LS = 'Local storage error',
	Server = 'Internal server error',
}

const reloadLSCategories = (): void => {
	LSDataParsed = reloadLS('categories');
	const jwt = LS.getItem('jwt');
	console.log(jwt);
	if (jwt != null) axios.defaults.headers.common.Authorization = jwt;
};

const updateLSCategories = (categories: Categories): void => {
	updateLS('categories', categories);
};

export const getAllCategories = async (): Promise<Categories> => {
	try {
		reloadLSCategories();

		if (LSDataParsed != null) return LSDataParsed;

		const categories: Categories = await (
			await axios.get(baseUrl, { headers: { Authorization: `Bearer ${LS.getItem('jwt') ?? ''}` } })
		).data;

		if (categories == null) throw Error(errors.Server);

		updateLSCategories(categories);
		return categories;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getOneCategory = async (id: ICategory['_id']): Promise<ICategory> => {
	try {
		reloadLSCategories();

		let category: ICategory | undefined;

		if (LSDataParsed != null) category = LSDataParsed.find(category => category._id === id);
		else
			category = await (
				await axios.get(`${baseUrl}/${id}`, { headers: { Authorization: `Bearer ${LS.getItem('jwt') ?? ''}` } })
			).data;

		if (category == null) throw Error("Category doesn't exist");

		return category;
	} catch (e) {
		console.error(e);
		return { ...emptyCategory };
	}
};

export const createCategory = async (newCategory: ICategory): Promise<void> => {
	try {
		reloadLSCategories();
		await axios.post(baseUrl, newCategory, { headers: { Authorization: `Bearer ${LS.getItem('jwt') ?? ''}` } });

		if (LSDataParsed == null) throw Error(errors.LS);

		const categoriesUpdated = LSDataParsed.concat(newCategory);
		updateLSCategories(categoriesUpdated);
	} catch (e) {
		console.error(e);
	}
};

export const deleteCategory = async (id: ICategory['_id']): Promise<void> => {
	try {
		reloadLSCategories();
		void axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: `Bearer ${LS.getItem('jwt') ?? ''}` } });

		if (LSDataParsed == null) throw Error(errors.LS);

		const categoriesUpdated = LSDataParsed.filter(category => category._id !== id);
		updateLSCategories(categoriesUpdated);
	} catch (e) {
		console.error(e);
	}
};

reloadLSCategories();
