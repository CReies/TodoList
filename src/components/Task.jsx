import React from 'react';

export const Task = ({ task }) => {
	const { _id, title, description, category, completed, createdAt } = task;
	return (
		<li>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>{category}</p>
			<p>{completed}</p>
			<p>{createdAt}</p>
		</li>
	);
};
