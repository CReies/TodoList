import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../reducers/categoriesReducer';

const Category = ({ category }) => {
	const dispatch = useDispatch();

	const { _id, title, color } = category;

	const activeCategoryId = useSelector(
		(state) => state.categories.activeCategory
	);

	const handleClick = (e) => {
		const target = document.querySelector(`#category-${_id}`);
		const categoryId = target.id.split('-')[1];

		if (activeCategoryId === categoryId) {
			dispatch(setActiveCategory(''));
			target.style.backgroundColor = 'unset';
		} else {
			dispatch(setActiveCategory(categoryId));
			target.style.backgroundColor = `${color}40`;
		}
	};

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClick={(e) => handleClick(e)}
			>
				<div className='color' style={{ backgroundColor: `${color}` }}></div>
				<div className='content'>{title}</div>
			</div>
		</>
	);
};

export default Category;
