import React from 'react';
import { Task } from './Task';
import { useTasks } from '../hooks/useTasks';

export const Tasks = () => {
	const { tasks, loading } = useTasks(1, 10);

	const tasksRender = loading ? (
		<p>Loading...</p>
	) : (
		tasks.map((task) => <Task key={task._id} task={task} />)
	);
	return <div className='tasks'>{tasksRender}</div>;
};
