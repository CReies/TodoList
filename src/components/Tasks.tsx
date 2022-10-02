import { useSelector } from 'react-redux';
import Task from './Task';
import type { RootState } from '../store';

// Tasks Component
const Tasks = () => {
	const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
	const tasks = useSelector((state: RootState) => state.tasks.data);

	let tasksRender = <p>Loading...</p>;

	if (!isLoading) {
		if (tasks.length === 0) tasksRender = <>Create a new task</>;
		else {
			tasksRender = (
				<>
					{tasks.map((task) => (
						<Task key={task._id} task={task} />
					))}
				</>
			);
		}
	}

	return <div className='tasks'>{tasksRender}</div>;
};

export default Tasks;
