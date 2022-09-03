import React, { useEffect, useState } from 'react';
import { API_URL } from '../.env/config';
import { useFetchData } from '../hooks/useFetchData';
import { CreateTask } from './CreateTask';
import { Modal } from './Modal';
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

/**
 * @returns Tasks Component
 */
export const Tasks = ({
	modalVisibleState,
	categoriesFetch,
	activeCategoryId,
	search,
}) => {
	// New task state
	// This will be passed to the create task form
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		category: '',
	});

	const [urlDelete, setUrlDelete] = useState('');

	// Get method
	const [tasksGet, taskGetMethod] = useFetchData({
		url: `${API_URL}/tasks`,
		name: 'tasks',
	});

	// Post method
	const [taskPost, taskPostMethod] = useFetchData({
		name: 'tasks',
		method: 'post',
		url: `${API_URL}/tasks`,
		data: {
			_id: uuidv4(),
			title: newTask.title,
			description: newTask.description,
			category: newTask.category,
		},
	});

	// Delete method
	const [taskDelete, taskDeleteMethod] = useFetchData({
		url: urlDelete,
		method: 'delete',
	});

	const [modalVisible, setModalVisible] = modalVisibleState;

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
					urlDeleteState={[urlDelete, setUrlDelete]}
					taskDeleteMethod={taskDeleteMethod}
				/>
			);
		});
	};

	// When the post or delete methods are executed, executes the get method again
	useEffect(() => {
		taskGetMethod();
	}, [taskPost, taskDelete]);

	const tasksRender = isLoading ? <p>Loading...</p> : filteredTasks(data);

	// Final Render
	return (
		<>
			<Modal
				visible={modalVisible}
				changeVisible={setModalVisible}
				title='New Task'
				content={
					<CreateTask
						closeModal={() => setModalVisible(false)}
						postMethod={taskPostMethod}
						taskState={[newTask, setNewTask]}
						categoriesFetch={categoriesFetch}
					/>
				}
			/>
			<div className='tasks'>{tasksRender}</div>
		</>
	);
};
