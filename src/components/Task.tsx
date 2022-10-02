import { useDispatch, useSelector } from 'react-redux';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { removeTask, setCompleteTask } from '../features/tasks/tasksSlice';
import {
	completeTask,
	deleteTask,
	uncompleteTask,
} from '../services/taskServices';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import type { ITask } from '../util/types';
import type { RootState } from '../store';

interface Props {
	task: ITask;
}

// Task Component
const Task = (props: Props) => {
	const {
		task: { _id, title, description, completed, category },
	} = props;

	const dispatch = useDispatch();

	const search = useSelector((state: RootState) => state.tasks.search);
	const activeCategory = useSelector(
		(state: RootState) => state.categories.activeCategory
	);

	const categoryIsActive = activeCategory === '' || activeCategory === category;
	const includesSearch =
		search === '' || title.includes(search) || description.includes(search);

	const handleDelete = () => {
		dispatch(removeTask(_id));
		deleteTask(_id);
	};

	const handleComplete = () => {
		dispatch(setCompleteTask({ id: _id, completed: !completed }));
		completeTask(_id);
	};

	useDidUpdateEffect(() => {
		if (completed) completeTask(_id);
		if (!completed) uncompleteTask(_id);
	}, [completed]);

	let taskRender = <></>;

	if (categoryIsActive && includesSearch) {
		taskRender = (
			<li className={`task ${completed ? 'completed' : ''}`}>
				<div className='complete-task'>
					<input
						type='checkbox'
						name='complete'
						id={`completeTask-${_id}`}
						checked={completed}
						onChange={handleComplete}
					/>
				</div>
				<div className='task-content'>
					<div className='title'>{title}</div>
					<div className='description'>{description}</div>
				</div>
				<div className='delete-task'>
					<Button
						icon={faTrash}
						className='delete-task'
						id={`deleteTask-${_id}`}
						onClick={handleDelete}
					/>
				</div>
			</li>
		);
	}

	return taskRender;
};

export default Task;
