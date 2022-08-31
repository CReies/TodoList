import React, { useEffect, useState } from 'react';
import { Task } from './Task';
import { Modal } from './Modal';
import { CreateTask } from './CreateTask';
import { useFetchData } from '../hooks/useFetchData';
import { API_URL } from '../.env/config';

export const Tasks = ({ modalVisible, setModalVisible }) => {
	const url = `${API_URL}/tasks`;
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		category: '',
	});

	const [tasksGet, taskGetMethod] = useFetchData({
		url,
		name: 'tasks',
	});
	const [taskPost, taskPostMethod] = useFetchData({
		name: 'tasks',
		method: 'post',
		url,
		data: {
			title: newTask.title,
			description: newTask.description,
			category: newTask.category,
		},
	});

	const { data, isLoading } = tasksGet;

	useEffect(() => {
		taskGetMethod();
	}, [taskPost]);

	const tasksRender = isLoading ? (
		<p>Loading...</p>
	) : (
		data.map((task) => <Task key={task.id} task={task} />)
	);
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
					/>
				}
			/>
			<div className='tasks'>{tasksRender}</div>
		</>
	);
};
