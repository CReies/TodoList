import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../features/categories/categoriesSlice';
import { RootState } from '../store';
import { $ } from '../util/functions';
import type { ICategory } from '../util/types';

interface Props {
	category: ICategory;
}

// Category element on the list
const Category = (props: Props) => {
	const {
		category: { _id, title, color },
	} = props;

	const activeCategoryId = useSelector(
		(state: RootState) => state.categories.activeCategory
	);

	const dispatch = useDispatch();

	// Toggles active state in the category
	const handleActiveCategory = () => {
		const target = $(`#category-${_id}`);
		if (!target) return;

		//! ToDo: fix this
		if (activeCategoryId === _id) {
			dispatch(setActiveCategory(''));
			target.style.backgroundColor = 'unset';
		} else {
			dispatch(setActiveCategory(_id));
			target.style.backgroundColor = `${color}40`;
		}
	};

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClick={handleActiveCategory}
			>
				<div className='color' style={{ backgroundColor: `${color}` }}></div>
				<div className='content'>{title}</div>
			</div>
		</>
	);
};

export default Category;
