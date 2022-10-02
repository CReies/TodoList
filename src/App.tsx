import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks, setTasksLoading } from './features/tasks/tasksSlice';
import {
	setCategories,
	toggleCategoriesLoading,
} from './features/categories/categoriesSlice';
import { getAllTasks } from './services/taskServices';
import { getAllCategories } from './services/categoryServices';
import Header from './components/Header';
import Aside from './components/Aside';
import Main from './components/Main';
import Footer from './components/Footer';
import 'normalize.css';
import './assets/styles/styles.scss';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async function () {
			if (!localStorage.getItem('tasks')) dispatch(setTasksLoading(true));
			if (!localStorage.getItem('categories'))
				dispatch(toggleCategoriesLoading(true));

			const tasks = await getAllTasks();
			const categories = await getAllCategories();
			dispatch(setTasks(tasks));
			dispatch(setCategories(categories));
			dispatch(setTasksLoading(false));
			dispatch(toggleCategoriesLoading(false));
		};

		fetchData();
	});

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
