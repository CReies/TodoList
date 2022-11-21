import { useDispatch, useSelector } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setDeleteMode } from '../features/categories/categoriesSlice';
import Category from './Category';
import Button from './Button';
import type { RootState } from '../store';

// Categories list component
const Categories = (): JSX.Element => {
	const dispatch = useDispatch();

	const categories = useSelector((state: RootState) => state.categories.data);
	const isLoading = useSelector((state: RootState) => state.categories.isLoading);
	const activeDeleteMode = useSelector((state: RootState) => state.categories.activeDeleteMode);

	const handleDeleteMode = (): void => {
		if (activeDeleteMode) dispatch(setDeleteMode(false));
		if (!activeDeleteMode) dispatch(setDeleteMode(true));
	};

	const noCategories = categories.length === 0;
	const removeCategoriesButtonRender = noCategories || (
		<div className='delete-mode-parent'>
			<Button
				className={`delete-mode ${activeDeleteMode ? 'active' : ''}`}
				id='deleteCategoryMode'
				icon={faTrash}
				onClick={handleDeleteMode}
			/>
		</div>
	);

	const categoriesRender = isLoading ? (
		<p>Loading...</p>
	) : (
		categories.map(category => <Category category={category} key={category._id} />)
	);

	return (
		<div className='categories'>
			<div className='header'>
				<div className='title'>
					<h2>Categories</h2>
				</div>
				{removeCategoriesButtonRender}
			</div>
			{categoriesRender}
		</div>
	);
};

export default Categories;
