import React, { useEffect } from 'react';
import { Category } from './Category';

export const Categories = ({ categoriesFetch, activeCategoryIdState }) => {
	const [activeCategoryId, setActiveCategoryId] = activeCategoryIdState;
	const [categoriesGet, categoriesGetMethod] = categoriesFetch;
	const { data, isLoading } = categoriesGet;

	useEffect(() => {
		categoriesGetMethod();
	}, []);

	const handleClick = (e) => {
		setActiveCategoryId(e.target.id.split('-')[1]);
	};

	const categoriesRender = isLoading ? (
		<p>Loading...</p>
	) : (
		data.map((category) => (
			<Category
				category={category}
				handleClick={handleClick}
				activeCategoryId={activeCategoryId}
				key={category.id}
			/>
		))
	);

	return categoriesRender;
};
