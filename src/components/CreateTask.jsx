import { useEffect } from 'react';

/**
 * Create Task Form
 *
 * @returns Create Task Form
 */
export const CreateTask = ({
	closeModal,
	taskState,
	postMethod,
	categoriesFetch,
}) => {
	// Task data entered in the form
	const [task, setTask] = taskState;

	const [categoriesGet, categoriesGetMethod] = categoriesFetch;

	const { data, isLoading } = categoriesGet;

	// When the component is rendered executes the getMethod
	useEffect(() => {
		categoriesGetMethod();
	}, []);

	// After executed getMethod changes the state task.category (this is because it doesn't reload when the localStorage change)
	useEffect(() => {
		setTask((prevState) => ({
			...prevState,
			category: document.querySelector('#categoriesSelect').value,
		}));
		console.log(task.category);
		console.log(document.querySelector('#categoriesSelect').value);
		console.log(isLoading);
	}, [categoriesGet]);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e) => {
		const target = e.target;
		setTask((prevState) => ({
			...prevState,
			[target.name]: e.target.value,
		}));
	};

	// <select> input for the category
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

	// Posts the task
	const submitCreateTask = (e) => {
		e.preventDefault();
		postMethod();
		closeModal();
	};

	// Final Render
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
