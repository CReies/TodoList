import React from 'react';

/**
 * @returns Header Component
 */
export const Header = ({ setModalVisible, searchState }) => {
	const [search, setSearch] = searchState;

	const handleOnChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<header>
			<input
				type='text'
				name='search'
				id='search'
				placeholder='Search'
				value={search}
				onChange={(e) => handleOnChange(e)}
			/>
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
