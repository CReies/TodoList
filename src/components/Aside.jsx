import React from 'react';
import { Categories } from './Categories';

/**
 * @returns Aside Component
 */
export const Aside = ({ categoriesFetch, activeCategoryIdState }) => {
	return (
		<aside>
			<h2>Categories</h2>
			<Categories
				activeCategoryIdState={activeCategoryIdState}
				categoriesFetch={categoriesFetch}
			/>
		</aside>
	);
};
