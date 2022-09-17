import React, { useEffect, useState } from 'react';
import { API_URL } from '../.env/config';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { useFetchData } from '../hooks/useFetchData';
import { Task } from './Task';

/**
 * @returns Tasks Component
 */
export const Tasks = ({ activeCategoryId, search, taskPost }) => {
	const [urlPut, setUrlPut] = useState('');
	const [urlDelete, setUrlDelete] = useState('');

	// Get method
	const [tasksGet, taskGetMethod] = useFetchData({
		url: `${API_URL}/tasks`,
		name: 'tasks',
	});

	// Put method
	const [taskPut, taskPutMethod] = useFetchData({
		name: 'tasks',
		url: urlPut,
		method: 'put',
	});

	// Delete method
	const [taskDelete, taskDeleteMethod] = useFetchData({
		name: 'tasks',
		url: urlDelete,
		method: 'delete',
	});

	const handlePut = (taskId, modified) => {
		console.log(taskId);
		setUrlPut(`${API_URL}/tasks/${modified}/${taskId}`);
		console.log(urlPut);
	};

	const handleDelete = (taskId) => {
		console.log(taskId);
		setUrlDelete(`${API_URL}/tasks/${taskId}`);
		console.log(urlDelete);
	};

	const { data, isLoading } = tasksGet;

	const filteredTasks = (tasks) => {
		if (!Array.isArray(tasks)) return tasks;

		return tasks.map((task) => {
			if (activeCategoryId !== '' && activeCategoryId !== task.category) return;

			if (
				search !== '' &&
				!task.title.includes(search) &&
				!task.description.includes(search)
			)
				return;

			return (
				<Task
					key={task._id}
					task={task}
					handlePut={handlePut}
					handleDelete={handleDelete}
				/>
			);
		});
	};

	// When the post or delete methods are executed, executes the get method again
	useEffect(() => {
		console.log('task get');
		taskGetMethod();
	}, [taskPost, taskPut, taskDelete]);

	// When urlPut change
	useDidUpdateEffect(() => {
		console.log('task put');
		taskPutMethod();
	}, [urlPut]);

	// When urlDelete change
	useDidUpdateEffect(() => {
		console.log('task delete');
		taskDeleteMethod();
	}, [urlDelete]);

	const tasksRender = isLoading ? <p>Loading...</p> : filteredTasks(data);

	// Final Render
	return <div className='tasks'>{tasksRender}</div>;
};
