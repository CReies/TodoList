import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../features/categories/categoriesSlice';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { RootState } from '../store';
import { $ } from '../util/functions';
import type { ICategory } from '../util/types';

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
	const handleActiveCategory = (): void => {
		if (activeCategoryId === _id) {
			dispatch(setActiveCategory(''));
		} else {
			dispatch(setActiveCategory(_id));
		}
	};

	useDidUpdateEffect(() => {
		const category = $(`#category-${_id}`) as HTMLElement;
		if (category == null) return;

		if (activeCategoryId === _id) {
			category.style.backgroundColor = `${color}40`;
		} else {
			category.style.backgroundColor = 'unset';
		}
	}, [activeCategoryId]);

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClick={handleActiveCategory}>
				<div className='color' style={{ backgroundColor: `${color}` }}></div>
				<div className='content'>{title}</div>
			</div>
		</>
	);
};

export default Category;
