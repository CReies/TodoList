import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../.env/config';
import { useFetchData } from '../hooks/useFetchData';
import { CreateCategory } from './CreateCategory';
import { CreateTask } from './CreateTask';
import { Modal } from './Modal';
import { Tabs } from './Tabs';
import { Tasks } from './Tasks';

/**
 * @returns Main Component
 */
export const Main = ({
	modalVisibleState,
	activeCategoryId,
	categoriesGet,
	search,
}) => {
	// New task state
	// This will be passed to the create task form
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		category: '',
	});

	// Post Task method
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

	const [modalContent, setModalContent] = useState();

	const [titleTab, setTitleTab] = useState('Category');

	const modalTitle = (
		<Tabs tabs={['Category', 'Task']} tabState={[titleTab, setTitleTab]} />
	);

	useEffect(() => {
		if (titleTab === 'Task') {
			setModalContent(
				<CreateTask
					closeModal={() => setModalVisible(false)}
					postMethod={taskPostMethod}
					taskState={[newTask, setNewTask]}
					categoriesGet={categoriesGet}
				/>
			);
			return;
		}
		setModalContent(<CreateCategory />);
	}, [titleTab]);

	const [modalVisible, setModalVisible] = modalVisibleState;

	return (
		<section className='content'>
			<Modal
				visible={modalVisible}
				changeVisible={setModalVisible}
				title={modalTitle}
				content={modalContent}
			/>
			<Tasks
				modalVisibleState={modalVisibleState}
				activeCategoryId={activeCategoryId}
				search={search}
				taskPost={taskPost}
			/>
		</section>
	);
};
