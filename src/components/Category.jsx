import React from 'react';

export const Category = ({ category, handleClick, activeCategoryId }) => {
	return (
		<>
			<div
				className={`category ${
					activeCategoryId === category._id ? 'active' : ''
				}`}
				id={`category-${category._id}`}
				onClick={(e) => handleClick(e)}
			>
				{category.title}
			</div>
		</>
	);
};
