import { React, useState } from 'react';
import { Modal } from './Modal';
import { CreateTask } from './CreateTask';

export const Header = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<header>
			<input type='text' name='search' id='search' placeholder='Search' />
			<button
				className='btn'
				id='new-task'
				onClick={() => setModalVisible(true)}
			>
				+
			</button>
			<Modal
				visible={modalVisible}
				changeVisible={setModalVisible}
				title='Test'
				content={<CreateTask />}
			/>
		</header>
	);
};
