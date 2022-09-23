import { useSelector } from 'react-redux';
import Category from './Category';

const Categories = () => {
	const { categories, isLoading } = useSelector((state) => state.categories);

	const categoriesRender = isLoading ? (
		<p>Loading...</p>
	) : (
		categories.map((category) => (
			<Category category={category} key={category._id} />
		))
	);

	return <div className='categories'>{categoriesRender}</div>;
};

export default Categories;
