import React from 'react';

export const Category = ({ category, handleClick, activeCategoryId }) => {
	return (
		<div
			className={`category ${activeCategoryId === category.id ? 'active' : ''}`}
			id={`category-${category.id}`}
			onClick={(e) => handleClick(e)}
		>
			{category.title}
		</div>
	);
};
