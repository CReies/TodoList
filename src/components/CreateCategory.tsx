import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../features/modal/modalSlice';
import { addCategory, resetNewCategory, setNewCategory } from '../features/categories/categoriesSlice';
import { v4 } from 'uuid';
import { createCategory } from '../services/categoryServices';
import type { ChangeEvent, FormEvent } from 'react';
import type { RootState } from '../store';

// Create Category Form
const CreateCategory = (): JSX.Element => {
	const dispatch = useDispatch();

	const newCategory = useSelector((state: RootState) => state.categories.newCategory);
	const modalVisible = useSelector((state: RootState) => state.modal.visible);

	// Dynamically changes the state when a input is modified
	const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const target = e.target;

		const name = target.name;
		const value = target.value;
		dispatch(setNewCategory({ name, value }));
	};

	// Posts the category
	const submitCreateCategory = (e: FormEvent): void => {
		const _id = v4();
		e.preventDefault();
		try {
			void createCategory({ ...newCategory, _id });
			dispatch(addCategory({ ...newCategory, _id }));
		} catch (e) {
			console.error(e);
		} finally {
			dispatch(resetNewCategory());
			dispatch(toggleModal(!modalVisible));
		}
	};

	// Final Render
	return (
		<>
			<form id='createCategory' onSubmit={e => submitCreateCategory(e)}>
				<div className='form-group'>
					<input
						type='text'
						name='title'
						id='categoryTitle'
						required
						value={newCategory.title}
						onChange={e => handleOnChange(e)}
						autoComplete='off'
					/>
					<span className='bar'></span>
					<label htmlFor='title'>Title</label>
				</div>
				<div className='form-group'>
					<input
						type='color'
						name='color'
						id='categoryColor'
						required
						value={newCategory.color}
						onChange={e => handleOnChange(e)}
						autoComplete='off'
					/>
					<span className='bar'></span>
					<label htmlFor='title'>Color</label>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						id='categoryDescription'
						required={false}
						value={newCategory.description}
						onChange={e => handleOnChange(e)}
					/>
					<span className='bar'></span>
					<label htmlFor='description'>Description</label>
				</div>
				<button type='submit' className='btn'>
					Create
				</button>
			</form>
		</>
	);
};

export default CreateCategory;
