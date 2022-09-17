import React, { useEffect } from 'react';
import { Category } from './Category';

export const Categories = ({ categoriesFetch, activeCategoryIdState }) => {
	const [categoriesGet, categoriesGetMethod] = categoriesFetch;
	const { data, isLoading } = categoriesGet;

	useEffect(() => {
		console.log('categories get');
		categoriesGetMethod();
	}, []);

	const categoriesRender = isLoading ? (
		<p>Loading...</p>
	) : (
		data.map((category) => (
			<Category
				category={category}
				activeCategoryIdState={activeCategoryIdState}
				key={category._id}
			/>
		))
	);

	return <div className='categories'>{categoriesRender}</div>;
};
