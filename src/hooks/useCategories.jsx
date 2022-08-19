import { useEffect, useState } from 'react';
import { getCategories } from '../services/getCategories.js';

export const useCategories = (page, limit) => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		setLoading(true);

		return async () => {
			let categoriesRes = await getCategories(page, limit);
			setCategories(categoriesRes);
			setLoading(false);
			document.cookie = `categories=${JSON.stringify(categoriesRes)}`;
		};
	}, [setCategories]);

	return { loading, categories };
};
