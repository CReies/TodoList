import { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { resetRegister, setLogin, setPage, setRegister } from '../features/auth/authSlice';
import { register } from '../services/authServices';
import { RootState } from '../store';

const Register = (): JSX.Element => {
	const dispatch = useDispatch();

	const registerForm = useSelector((state: RootState) => state.auth.registerForm);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { target } = e;
		const { name, value } = target;

		dispatch(setRegister({ [name]: value }));
	};

	const handleChangePage = (): void => {
		dispatch(setPage('login'));
	};

	const submitRegister = (e: FormEvent): void => {
		const id = v4();
		e.preventDefault();
		try {
			void register(registerForm, id);
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(setLogin({ username: registerForm.username }));
			dispatch(resetRegister);
			dispatch(setPage('login'));
		}
	};

	return (
		<>
			<div id='registerPage' className='container'>
				<form id='register' onSubmit={e => submitRegister(e)}>
					<div className='form-group'>
						<input
							type='text'
							name='username'
							id='registerUsername'
							required
							value={registerForm.username}
							onChange={e => handleOnChange(e)}
						/>
						<label htmlFor='username'>Username</label>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='registerPassword'
							required
							value={registerForm.password}
							onChange={e => handleOnChange(e)}
						/>
						<label htmlFor='password'>Password</label>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='passwordConfirm'
							id='registerPasswordConfirm'
							required
							value={registerForm.passwordConfirm}
							onChange={e => handleOnChange(e)}
						/>
						<label htmlFor='passwordConfirm'>Confirm Password</label>
					</div>
					<div className='row'>
						<button className='btn' onClick={() => handleChangePage()}>
							Login
						</button>
						<button type='submit' className='btn'>
							Register
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Register;
