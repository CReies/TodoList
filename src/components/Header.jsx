import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../reducers/modalReducer';
import Button from './Button';

/**
 * @returns Header Component
 */
const Header = () => {
	const dispatch = useDispatch();

	const search = useSelector((state) => state.tasks.search);

	const handleOnChange = (e) => {
		const target = e.target;
		dispatch(target.value);
	};

	const handleOnClick = (e) => {
		dispatch(toggleModal());
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
