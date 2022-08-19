import React from 'react';

export const Header = () => {
	return (
		<header>
			<input type='text' name='search' id='search' placeholder='Search' />
			<button className='btn' id='new-task'>
				+
			</button>
		</header>
	);
};
