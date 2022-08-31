import React from 'react';

export const Header = ({ setModalVisible }) => {
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
		</header>
	);
};
