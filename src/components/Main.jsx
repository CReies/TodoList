import React from 'react';
import { Tasks } from './Tasks';

/**
 * @returns Main Component
 */
export const Main = ({ modalVisible, setModalVisible }) => {
	return (
		<section className='content'>
			<Tasks modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</section>
	);
};
