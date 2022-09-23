import { useDispatch, useSelector } from 'react-redux';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { toggleModal } from '../reducers/modalReducer';
import { resetNewTask, setNewTask } from '../reducers/tasksReducer';
import { createTask } from '../services/taskServices';

/**
 * Create Task Form
 *
 * @returns Create Task Form
 */
const CreateTask = () => {
	const dispatch = useDispatch();

	const newTask = useSelector((state) => state.tasks.newTask);
	const categories = useSelector((state) => state.categories.data);
	const isLoading = useSelector((state) => state.categories.isLoading);

	// After executed getMethod changes the state task.category (this is because it doesn't reload when the localStorage change)
	useDidUpdateEffect(() => {
		dispatch(
			setNewTask({
				name: 'category',
				value: document.querySelector('#categoriesSelect').value,
			})
		);
	}, [categories]);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e) => {
		const target = e.target;
		dispatch(setNewTask({ name: target.name, value: target.value }));
	};

	// <select> input for the category
	const selectCategory = (
		<select
			name='category'
			id='categoriesSelect'
			value={newTask.category}
			onChange={(e) => handleOnChange(e)}
		>
			{isLoading ? (
				<option value='Loading'>Loading</option>
			) : (
				categories.map((category) => (
					<option key={category._id} value={category._id}>
						{category.title}
					</option>
				))
			)}
		</select>
	);

	// Posts the task
	const submitCreateTask = (e) => {
		e.preventDefault();
		createTask(newTask);
		dispatch(resetNewTask());
		dispatch(toggleModal());
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
						value={newTask.title}
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
						value={newTask.description}
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

export default CreateTask;
