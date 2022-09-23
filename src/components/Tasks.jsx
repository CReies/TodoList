import { useSelector } from 'react-redux';
import Task from './Task';

/**
 * @returns Tasks Component
 */
const Tasks = () => {
	const { isLoading, tasks } = useSelector((state) => state.tasks);

	const tasksRender = isLoading ? (
		<p>Loading...</p>
	) : (
		tasks.map((task) => <Task key={task._id} task={task} />)
	);

	// Final Render
	return <div className='tasks'>{tasksRender}</div>;
};

export default Tasks;
