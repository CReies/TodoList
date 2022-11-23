import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks, setTasksLoading } from '../features/tasks/tasksSlice';
import { setCategories, setCategoriesLoading } from '../features/categories/categoriesSlice';
import { LS } from '../util/consts';
import { getAllTasks } from '../services/taskServices';
import { getAllCategories } from '../services/categoryServices';
import Header from '../components/Header';
import Aside from '../components/Aside';
import Main from '../components/Main';
import Footer from '../components/Footer';
import 'normalize.css';
import '../assets/styles/styles.scss';

const Home = (): JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async function (): Promise<void> {
			LS.clear();
			dispatch(setTasksLoading(true));
			dispatch(setCategoriesLoading(true));

			const tasks = await getAllTasks();
			const categories = await getAllCategories();

			dispatch(setTasks(tasks));
			dispatch(setCategories(categories));
			dispatch(setTasksLoading(false));
			dispatch(setCategoriesLoading(false));
		};

		void fetchData();
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

export default Home;
