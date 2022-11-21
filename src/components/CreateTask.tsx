import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { toggleModal } from '../features/modal/modalSlice';
import { addTask, resetNewTask, setNewTask } from '../features/tasks/tasksSlice';
import { createTask } from '../services/taskServices';
import type { ChangeEvent, FormEvent } from 'react';
import type { RootState } from '../store';

// Create Task Form
const CreateTask = (): JSX.Element => {
	const dispatch = useDispatch();

	const newTask = useSelector((state: RootState) => state.tasks.newTask);
	const categories = useSelector((state: RootState) => state.categories.data);
	const modalVisible = useSelector((state: RootState) => state.modal.visible);
	const isLoading = useSelector((state: RootState) => state.categories.isLoading);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
		const target = e.target;

		const name = target.name;
		const value = target.value;
		dispatch(setNewTask({ name, value }));
	};

	// Posts the task
	const submitCreateTask = (e: FormEvent): void => {
		const _id = v4();
		e.preventDefault();
		try {
			void createTask({ ...newTask, _id });
			dispatch(addTask({ ...newTask, _id }));
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(resetNewTask());
			dispatch(toggleModal(!modalVisible));
		}
	};

	// <select> input for the category
	const selectCategory = (
		<select name='category' id='categoriesSelect' value={newTask.category} onChange={e => handleOnChange(e)}>
			{isLoading ? (
				<option value='Loading'>Loading</option>
			) : (
				categories.map(category => (
					<option key={category._id} value={category._id}>
						{category.title}
					</option>
				))
			)}
		</select>
	);

	// Final Render
	return (
		<>
			<form id='createTask' onSubmit={e => submitCreateTask(e)}>
				<div className='form-group'>
					<input
						type='text'
						name='title'
						id='taskTitle'
						required
						value={newTask.title}
						onChange={e => handleOnChange(e)}
						autoComplete='off'
					/>
					<span className='bar'></span>
					<label htmlFor='title'>Title</label>
				</div>

				<div className='form-group'>
					<textarea
						name='description'
						id='taskDescription'
						required={false}
						value={newTask.description}
						onChange={e => handleOnChange(e)}
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
