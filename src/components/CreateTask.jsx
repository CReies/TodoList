import React from 'react';
import { useCategories } from '../hooks/useCategories';

export const CreateTask = () => {
	const { loading, categories } = useCategories();

	const inputCategories = (
		<input
			autocomplete='off'
			role='combobox'
			list=''
			id='category'
			name='category'
			placeholder='Category'
			onFocus={(e) => categoryFocus(e)}
		/>
	);

	const optCategories = loading ? (
		<option>Loading...</option>
	) : (
		categories.map((category) => (
			<option key={category._id} value={category._id} onClick={() => {}}>
				{category.title}
			</option>
		))
	);

	const categoryDatalist = (
		<datalist id='categories' role='listbox'>
			<option value=''></option>
			{optCategories}
		</datalist>
	);

	const categoryFocus = (_e) => {
		$('').style.display = 'block';
	};

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
				{inputCategories}
			</form>
			{categoryDatalist}
		</>
	);
};
