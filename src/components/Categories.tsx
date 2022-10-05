import { useSelector } from 'react-redux';
import Category from './Category';
import type { RootState } from '../store';

// Categories list component
const Categories = (): JSX.Element => {
	const categories = useSelector((state: RootState) => state.categories.data);
	const isLoading = useSelector((state: RootState) => state.categories.isLoading);

	const categoriesRender = isLoading ? (
		<p>Loading...</p>
	) : (
		categories.map(category => <Category category={category} key={category._id} />)
	);

	return <div className='categories'>{categoriesRender}</div>;
};

export default Categories;
