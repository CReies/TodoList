import React from 'react';
import { Tasks } from './Tasks';

/**
 * @returns Main Component
 */
export const Main = ({
	modalVisible,
	setModalVisible,
	categoriesFetch,
	activeCategoryId,
	search
}) => {
	return (
		<section className='content'>
			<Tasks
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				categoriesFetch={categoriesFetch}
				activeCategoryId={activeCategoryId}
				search={search}
			/>
		</section>
	);
};
