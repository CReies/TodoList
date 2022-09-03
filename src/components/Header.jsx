import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button } from './Button';

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
			<Button
				icon={faPlus}
				className='btn'
				id='new-task'
				onClick={() => setModalVisible(true)}
			/>
		</header>
	);
};
