import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { completeTask, uncompleteTask } from '../services/taskServices';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { toggleCompleteTask } from '../reducers/tasksReducer';

/**
 * @returns Task Component
 */
const Task = ({ task }) => {
	const dispatch = useDispatch();

	const activeCategoryState = useSelector(
		(state) => state.categories.activeCategory
	);
	const searchState = useSelector((state) => state.tasks.search);
	const { _id, title, description, completed, category } = task;

	useDidUpdateEffect(() => {
		if (completed) uncompleteTask(_id);
		if (!completed) completeTask(_id);
	}, [completed]);

	const includesSearch =
		searchState === '' ||
		title.includes(searchState) ||
		description.includes(searchState);

	const categoryIsActive =
		activeCategoryState === '' || activeCategoryState === category;

	return (
		!(includesSearch && categoryIsActive) || (
			<li className={`task ${completed ? 'completed' : ''}`}>
				<div className='complete-task'>
					<input
						type='checkbox'
						name='complete'
						id={`completeTask-${_id}`}
						checked={completed}
						onChange={() => dispatch(toggleCompleteTask(_id))}
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
						onClick={() => handleDelete(_id)}
					/>
				</div>
			</li>
		)
	);
};

export default Task;
