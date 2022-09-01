import 'normalize.css';
import { useState } from 'react';
import { API_URL } from './.env/config';
import './assets/styles/styles.scss';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { useFetchData } from './hooks/useFetchData';

const App = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [activeCategoryId, setActiveCategoryId] = useState({});
	const [search, setSearch] = useState('');
	const [categoriesGet, categoriesGetMethod] = useFetchData({
		url: `${API_URL}/categories`,
		name: 'categories',
	});

	return (
		<>
			<Header
				searchState={[search, setSearch]}
				setModalVisible={setModalVisible}
			/>
			<main>
				<Aside
					categoriesFetch={[categoriesGet, categoriesGetMethod]}
					activeCategoryIdState={[activeCategoryId, setActiveCategoryId]}
				/>
				<Main
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					activeCategoryId={activeCategoryId}
					search={search}
					categoriesFetch={[categoriesGet, categoriesGetMethod]}
				/>
			</main>
			<Footer />
		</>
	);
};

export default App;
