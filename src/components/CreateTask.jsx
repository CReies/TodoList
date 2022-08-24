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

	const inputCategory = (
		<input
			autoComplete='off'
			role='combobox'
			list=''
			id='category'
			name='category'
			placeholder='Category'
			onInput={(e) => inputOnInput(e, document.querySelector('#categories'))}
			onKeyDown={(e) => inputOnKeyDown(e)}
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
			<form>
				<input type='text' name='title' id='title' placeholder='Title' />
				<input
					type='text'
					name='description'
					id='description'
					placeholder='Description'
				/>
				{inputCategory}
				{datalistCategory}
			</form>
		</>
	);
};
