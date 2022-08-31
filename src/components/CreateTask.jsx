import { useEffect } from 'react';
import { API_URL } from '../.env/config';
import { useFetchData } from '../hooks/useFetchData';

export const CreateTask = ({ closeModal, taskState, postMethod }) => {
	const [task, setTask] = taskState;

	const url = `${API_URL}/categories`;
	const [categoriesGet, categoriesGetMethod] = useFetchData({
		url,
		name: 'categories',
	});

	const { data, isLoading } = categoriesGet;

	useEffect(() => {
		categoriesGetMethod();
	}, []);

	useEffect(() => {
		setTask((prevState) => ({
			...prevState,
			category: document.querySelector('#categoriesSelect').value,
		}));
		console.log(task.category);
		console.log(document.querySelector('#categoriesSelect').value);
		console.log(isLoading);
	}, [data]);

	const handleOnChange = (e) => {
		const target = e.target;
		setTask((prevState) => ({
			...prevState,
			[target.name]: e.target.value,
		}));
	};

	const selectCategory = (
		<select
			name='category'
			id='categoriesSelect'
			value={task.category}
			onChange={(e) => handleOnChange(e)}
		>
			{isLoading ? (
				<option value='Loading'>Loading</option>
			) : (
				data.map((category) => (
					<option key={category.id} value={category.id}>
						{category.title}
					</option>
				))
			)}
		</select>
	);

	const submitCreateTask = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataJSON = {};

		formData.forEach((value, key) => (formDataJSON[key] = value));

		postMethod();
		closeModal();
	};

	return (
		<>
			<form id='createTask' onSubmit={(e) => submitCreateTask(e)}>
				<div className='form-group'>
					<input
						type='text'
						name='title'
						id='taskTitle'
						required
						value={task.title}
						onChange={(e) => handleOnChange(e)}
						autoComplete='off'
					/>
					<span className='bar'></span>
					<label htmlFor='title'>Title</label>
				</div>

				<div className='form-group'>
					<textarea
						name='description'
						id='taskDescription'
						required=''
						value={task.description}
						onChange={(e) => handleOnChange(e)}
					/>
					<span className='bar'></span>
					<label htmlFor='description'>Description</label>
				</div>

				<div className='form-group'>
					{selectCategory}
					<span className='bar'></span>
					<label htmlFor='category'>Category</label>
				</div>

				<button type='submit' className='btn'>
					Create
				</button>
			</form>
		</>
	);
};
