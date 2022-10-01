import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../features/modal/modalSlice';
import { setSearch } from '../features/tasks/tasksSlice';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import type { RootState } from '../store';
import type { ChangeEvent, MouseEvent } from 'react';

// Header Component
const Header = () => {
	const dispatch = useDispatch();

	const modalVisible = useSelector((state: RootState) => state.modal.visible);
	const search = useSelector((state: RootState) => state.tasks.search);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		if (!target) return;

		dispatch(setSearch(target.value));
	};

	const handleOnClick = (e: MouseEvent) => {
		dispatch(toggleModal(modalVisible));
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
					onClick={(e) => handleOnClick(e)}
				/>
			</div>
		</header>
	);
};

export default Header;
