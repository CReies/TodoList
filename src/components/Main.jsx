import React from 'react';
import { Tasks } from './Tasks';

/**
 * @returns Main Component
 */
export const Main = ({
	modalVisibleState,
	categoriesFetch,
	activeCategoryId,
	search,
}) => {
	return (
		<section className='content'>
			<Tasks
				modalVisibleState={modalVisibleState}
				categoriesFetch={categoriesFetch}
				activeCategoryId={activeCategoryId}
				search={search}
			/>
		</section>
	);
};
