import React, { useState } from 'react';
import Task from '../Task';
import tempTasks from './tempTasks';

const Tasks = () => {
	const [tasks, setTasks] = useState(tempTasks);

	const tasksRender = tasks.map((task, index) => {
		return (
			<Task task={task} index={index} key={`task-${task.id}`} />
		);
	});

	return tasksRender;
};

export default Tasks;
