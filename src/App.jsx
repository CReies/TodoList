import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import Footer from './components/Footer';
import 'normalize.css';
import './assets/styles/styles.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTasks } from './services/taskServices';
import { setTasks, toggleTasksLoading } from './reducers/tasksReducer';
import { getAllCegories } from './services/categoryServices';
import {
	setCategories,
	toggleCategoriesLoading,
} from './reducers/categoriesReducer';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async function () {
			if (!localStorage.getItem('tasks')) dispatch(toggleTasksLoading(true));
			if (!localStorage.getItem('categories'))
				dispatch(toggleCategoriesLoading(true));

			const tasks = await getAllTasks();
			const categories = await getAllCegories();
			dispatch(setTasks(tasks));
			dispatch(setCategories(categories));
			dispatch(toggleTasksLoading(false));
			dispatch(toggleCategoriesLoading(false));
		};

		return () => {
			fetchData();
		};
	}, []);

	return (
		<>
			<Header />
			<main>
				<Aside />
				<Main />
			</main>
			<Footer />
		</>
	);
};

export default App;
