import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
			<div className='margin' />
			<div className='content'>
				<div className='input-group'>
					<FontAwesomeIcon icon={faSearch} />
					<input
						type='text'
						name='search'
						id='search'
						placeholder='Search'
						value={search}
						onChange={(e) => handleOnChange(e)}
					/>
				</div>
				<Button
					icon={faPlus}
					className='btn'
					id='new-task'
					onClick={() => setModalVisible(true)}
				/>
			</div>
		</header>
	);
};
