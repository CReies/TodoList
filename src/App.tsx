import 'normalize.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './assets/styles/styles.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { setLogged } from './features/auth/authSlice';
import { RootState } from './store';
import { LS } from './util/consts';

const App = (): JSX.Element => {
	const dispatch = useDispatch();

	const logged = useSelector((state: RootState) => state.auth.logged);
	const page = useSelector((state: RootState) => state.auth.actualPage);

	useEffect(() => {
		const jwt = LS.getItem('jwt');
		if (jwt != null) dispatch(setLogged(true));
	}, []);

	return logged ? <Home /> : page === 'login' ? <Login /> : <Register />;
};

export default App;
