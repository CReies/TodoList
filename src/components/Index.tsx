import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const Index = (): JSX.Element => {
	return (
		<>
			<Header />
			<main>
				<Aside /> <Main />
			</main>
			<Footer />
		</>
	);
};

export default Index;
