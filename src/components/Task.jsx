import React from 'react';

/**
 * @returns Task Component
 */
export const Task = ({ task }) => {
	const { id, title, description } = task;
	return (
		<li className='task'>
			<div className='complete-task'>
				<input type='checkbox' name='complete' id={`completeTask-${id}`} />
			</div>
			<div className='task-content'>
				<div className='title'>{title}</div>
				<div className='description'>{description}</div>
			</div>
			<div className='delete-task'>
				<button>{'<-'}</button>
			</div>
		</li>
	);
};
