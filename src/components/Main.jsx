import React from 'react';
import { Tasks } from './Tasks';

/**
 * @returns Main Component
 */
export const Main = ({ modalVisible, setModalVisible, categoriesFetch }) => {
	return (
		<section className='content'>
			<Tasks
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				categoriesFetch={categoriesFetch}
			/>
		</section>
	);
};
