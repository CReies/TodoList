import { useEffect, useState } from 'react';
import { getTasks } from '../services/getTasks.js';

export const useTasks = (page, limit) => {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setLoading(true);

		return async () => {
			let tasksRes = await getTasks(page, limit);
			setTasks(tasksRes);
			setLoading(false);
		};
	}, [setTasks]);

	return { loading, tasks };
};
