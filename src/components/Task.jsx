import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button } from './Button';

/**
 * @returns Task Component
 */
export const Task = ({ task,  taskDeleteMethod }) => {
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
				<Button
					icon={faTrash}
					className='delete-task'
					id={`deleteTask-${id}`}
					color='red'
					onClick={taskDeleteMethod}
				/>
			</div>
		</li>
	);
};
