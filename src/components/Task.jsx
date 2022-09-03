import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button } from './Button';

/**
 * @returns Task Component
 */
export const Task = ({ task, handleDelete }) => {
	const { _id, title, description } = task;

	return (
		<li className='task'>
			<div className='complete-task'>
				<input type='checkbox' name='complete' id={`completeTask-${_id}`} />
			</div>
			<div className='task-content'>
				<div className='title'>{title}</div>
				<div className='description'>{description}</div>
			</div>
			<div className='delete-task'>
				<Button
					icon={faTrash}
					className='delete-task'
					id={`deleteTask-${_id}`}
					color='red'
					onClick={() => handleDelete(_id)}
				/>
			</div>
		</li>
	);
};
