import { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin, setLogged, setLogin, setPage } from '../features/auth/authSlice';
import { login } from '../services/authServices';
import { RootState } from '../store';
import { LS } from '../util/consts';

const Login = (): JSX.Element => {
	const dispatch = useDispatch();

	const loginForm = useSelector((state: RootState) => state.auth.loginForm);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { target } = e;
		const { name, value } = target;

		dispatch(setLogin({ [name]: value }));
	};

	const handleChangePage = (): void => {
		dispatch(setPage('register'));
	};

	const submitLogin = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		try {
			const jwt = await login(loginForm);

			if (jwt != null) LS.setItem('jwt', jwt);

			dispatch(setLogged(true));
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(resetLogin);
		}
	};

	return (
		<>
			<div id='loginPage' className='container'>
				<form
					id='login'
					onSubmit={e => {
						void submitLogin(e);
					}}>
					<div className='form-group'>
						<input
							type='text'
							name='username'
							id='loginUsername'
							required
							value={loginForm.username}
							onChange={e => handleOnChange(e)}
						/>
						<label htmlFor='username'>Username</label>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='loginPassword'
							required
							value={loginForm.password}
							onChange={e => handleOnChange(e)}
						/>
						<label htmlFor='password'>Password</label>
					</div>
					<div className='row'>
						<button className='btn' onClick={() => handleChangePage()}>
							Register
						</button>
						<button type='submit' className='btn'>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
