import { useDispatch, useSelector } from 'react-redux';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { removeCategory, setActiveCategory } from '../features/categories/categoriesSlice';
import { $ } from '../util/functions';
import { deleteCategory } from '../services/categoryServices';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import type { MouseEvent } from 'react';
import type { RootState } from '../store';
import type { ICategory } from '../types/types';

interface Props {
	category: ICategory;
}

// Category element on the list
const Category = (props: Props): JSX.Element => {
	const {
		category: { _id, title, color },
	} = props;

	const activeCategoryId = useSelector((state: RootState) => state.categories.activeCategory);
	const activeDeleteMode = useSelector((state: RootState) => state.categories.activeDeleteMode);

	const dispatch = useDispatch();

	// Toggles active state in the category
	const handleActiveCategory = (e: MouseEvent<Element>): void => {
		e.stopPropagation();
		if (activeCategoryId === _id) dispatch(setActiveCategory(''));
		else dispatch(setActiveCategory(_id));
	};

	useDidUpdateEffect(() => {
		const category = $(`#category-${_id}`);
		if (category == null) return;

		if (activeCategoryId === _id) category.style.backgroundColor = `${color}40`;
		else category.style.backgroundColor = 'unset';
	}, [activeCategoryId]);

	const handleDelete = (): void => {
		dispatch(removeCategory(_id));
		void deleteCategory(_id);
	};

	const categoryColor = !activeDeleteMode ? (
		<div className='color' style={{ backgroundColor: `${color}` }}></div>
	) : (
		<></>
	);

	const deleteButton = activeDeleteMode ? (
		<Button id='deleteCategory' className='delete-category' onClick={handleDelete} icon={faTrash} color={color} />
	) : (
		<></>
	);

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClickCapture={e => handleActiveCategory(e)}>
				{categoryColor}
				{deleteButton}
				<div className='content'>{title}</div>
			</div>
		</>
	);
};

export default Category;
