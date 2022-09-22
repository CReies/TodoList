import React from 'react';

export const Category = ({ category, activeCategoryIdState }) => {
	const { _id, title, color } = category;
	const [activeCategoryId, setActiveCategoryId] = activeCategoryIdState;

	const handleClick = (e) => {
		const target = document.querySelector(`#category-${_id}`);
		const categoryId = target.id.split('-')[1];

		if (activeCategoryId === categoryId) {
			setActiveCategoryId('');
			target.style.backgroundColor = 'unset';
		} else {
			setActiveCategoryId(categoryId);
			target.style.backgroundColor = `${color}40`;
		}
	};

	return (
		<>
			<div
				className={`category ${activeCategoryId === _id ? 'active' : ''}`}
				id={`category-${_id}`}
				onClick={(e) => handleClick(e)}
			>
				<div className='color' style={{ backgroundColor: `${color}` }}></div>
				<div className='content'>{title}</div>
			</div>
		</>
	);
};
