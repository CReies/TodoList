import 'normalize.css';
import { useState } from 'react';
import './assets/styles/styles.scss';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

const App = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Header setModalVisible={setModalVisible} />
			<main>
				<Aside />
				<Main modalVisible={modalVisible} setModalVisible={setModalVisible} />
			</main>
			<Footer />
		</>
	);
};

export default App;
