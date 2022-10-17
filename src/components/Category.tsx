import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, setActiveCategory } from '../features/categories/categoriesSlice';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { deleteCategory } from '../services/categoryServices';
import { RootState } from '../store';
import { $ } from '../util/functions';
import type { ICategory } from '../util/types';
import Button from './Button';

interface Props {
	category: ICategory;
}

// Category element on the list
const Category = (props: Props): JSX.Element => {
	const {
		category: { _id, title, color },
	} = props;

	const activeCategoryId = useSelector((state: RootState) => state.categories.activeCategory);

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

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClickCapture={e => handleActiveCategory(e)}>
				<div className='color' style={{ backgroundColor: `${color}` }}></div>
				<div className='content'>
					{title}
					<Button
						id='deleteCategory'
						className='delete-category'
						onClick={handleDelete}
						icon={faTrash}
					/>
				</div>
			</div>
		</>
	);
};

export default Category;
