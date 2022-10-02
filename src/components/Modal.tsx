import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../features/modal/modalSlice';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import CreateTask from './CreateTask';
import CreateCategory from './CreateCategory';
import type { RootState } from '../store';
import type { ReactElement } from 'react';

interface Props {
	title: string | ReactElement;
}

// Modal Component
const Modal = (props: Props) => {
	const { title } = props;
	const dispatch = useDispatch();

	const modal = useSelector((state: RootState) => state.modal);

	let content;

	switch (modal.content) {
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

	let modalRender = <></>;

	if (modal.visible) {
		modalRender = (
			<div className={`modal-overlay showOverlay`}>
				<div className={`modal showShadow`}>
					{title && (
						<div className='modal-header'>
							<div className='modal-title'>{title}</div>
							<Button
								id='closeModal'
								icon={faX}
								onClick={() => dispatch(toggleModal(!modal.visible))}
								className='modal-close'
							/>
						</div>
					)}
					<div className='modal-content'>{content}</div>
				</div>
			</div>
		);
	}

	return modalRender;
};

export default Modal;
