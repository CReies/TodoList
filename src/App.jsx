import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import 'normalize.css';
import './assets/styles/styles.scss';

function App() {
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
}

export default App;
