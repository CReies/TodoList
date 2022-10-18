import { useSelector } from 'react-redux';
import Task from './Task';
import type { RootState } from '../store';

// Tasks Component
const Tasks = (): JSX.Element => {
	const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
	const tasks = useSelector((state: RootState) => state.tasks.data);

	let tasksRender = <p>Loading...</p>;
	let tasksUncompleted;
	let tasksCompleted;

	if (!isLoading) {
		if (tasks.length === 0) tasksRender = <>Create a new task</>;
		else {
			tasksUncompleted = (
				<>
					<div className='tasks-uncompleted'>
						<h3>Uncompleted</h3>
						{tasks
							.filter(task => !task.completed)
							.map(task => (
								<Task key={task._id} task={task} />
							))}
					</div>
				</>
			);

			tasksCompleted = (
				<>
					<div className='tasks-completed'>
						<h3>Completed</h3>
						{tasks
							.filter(task => task.completed)
							.map(task => (
								<Task key={task._id} task={task} />
							))}
					</div>
				</>
			);

			tasksRender = (
				<>
					{tasksUncompleted}
					{tasksCompleted}
				</>
			);
		}
	}

	return <div className='tasks'>{tasksRender}</div>;
};

export default Tasks;
