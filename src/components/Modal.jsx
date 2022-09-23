import Button from './Button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../reducers/modalReducer';
import CreateTask from './CreateTask';
import CreateCategory from './CreateCategory';

/**
 * @returns Modal Component
 */
const Modal = ({ title }) => {
	const dispatch = useDispatch();
	const modalState = useSelector((state) => state.modal);

	let content;

	switch (modalState.content) {
		case 'Task':
			content = <CreateTask />;
			break;

		case 'Category':
			content = <CreateCategory />;
			break;

		default:
			content = 'Modal content error';
			break;
	}

	return (
		modalState.visible && (
			<div className={`modal-overlay showOverlay`}>
				<div className={`modal showShadow`}>
					{title && (
						<div className='modal-header'>
							<div className='modal-title'>{title}</div>
							<Button
								icon={faX}
								onClick={() => dispatch(toggleModal())}
								className='modal-close'
							/>
						</div>
					)}
					<div className='modal-content'>{content}</div>
				</div>
			</div>
		)
	);
};

export default Modal;
