import React from 'react';
import { useCategories } from '../hooks/useCategories';

export const CreateTask = () => {
	const { loading, categories } = useCategories();

	let currentFocus = -1;

	const removeActive = (x) => {
		for (const el of x) {
			el.classList.remove('active');
		}
	};

	const addActive = (x) => {
		if (!x) return false;

		removeActive(x);

		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;

		x[currentFocus].classList.add('active');
	};

	const inputOnInput = (e, datalist) => {
		let text = e.target.value.toUpperCase();
		for (const opt of datalist.options) {
			if (opt.value.toUpperCase().indexOf(text) > -1) {
				opt.style.display = 'block';
			} else {
				opt.style.display = 'none';
			}
		}
	};
	const inputOnKeyDown = (e) => {
		if (e.keyCode === 40) {
			currentFocus++;
			addActive(datalist.options);
		}
		if (e.keyCode === 38) {
			currentFocus--;
			addActive(datalist.options);
		}
		if (e.keyCode === 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (datalist.options) datalist.options[currentFocus].click();
			}
		}
	};

	const inputOnFocus = (datalist) => {
		datalist.style.display = 'block';
	};

	const inputOnBlur = (datalist) => {
		datalist.style.display = 'none';
	};

	const inputCategory = (
		<input
			autoComplete='off'
			role='combobox'
			list=''
			id='taskCategory'
			name='category'
			onInput={(e) => inputOnInput(e, document.querySelector('#categories'))}
			onKeyDown={(e) => inputOnKeyDown(e)}
			onFocus={() => inputOnFocus(document.querySelector('#categories'))}
			onBlur={() => inputOnBlur(document.querySelector('#categories'))}
		/>
	);

	const datalistCategory = (
		<datalist id='categories' role='listbox'>
			{loading ? (
				<option>Loading...</option>
			) : (
				categories.map((category) => (
					<option
						key={category._id}
						value={category.title}
						onClick={() => (inputCategory.value = category.title)}
					>
						{category.title}
					</option>
				))
			)}
		</datalist>
	);

	return (
		<>
			<form id='createTask'>
				<div className='form-group'>
					<input type='text' name='title' id='taskTitle' required />
					<span className='bar'></span>
					<label htmlFor='title'>Title</label>
				</div>

				<div className='form-group'>
					<textarea name='description' id='taskDescription' required='' />
					<span className='bar'></span>
					<label htmlFor='description'>Description</label>
				</div>

				<div className='form-group'>
					{inputCategory}
					<span className='bar'></span>
					<label htmlFor='category'>Category</label>
					{datalistCategory}
				</div>
			</form>
		</>
	);
};
