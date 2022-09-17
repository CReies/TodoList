import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';

/**
 * @returns Task Component
 */
export const Task = ({ task, handlePut, handleDelete }) => {
	const { _id, title, description, completed } = task;

	const [complete, setComplete] = useState(completed);

	useEffect(() => {
		handlePut(_id, complete ? 'complete' : 'uncomplete');
	}, [complete]);

	return (
		<li className={`task ${completed ? 'completed' : ''}`}>
			<div className='complete-task'>
				<input
					type='checkbox'
					name='complete'
					id={`completeTask-${_id}`}
					checked={complete}
					onChange={(e) => setComplete(e.target.checked)}
				/>
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
					onClick={() => handleDelete(_id)}
				/>
			</div>
		</li>
	);
};
