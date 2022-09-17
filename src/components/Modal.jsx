import React from 'react';
import { Button } from './Button';
import { faX } from '@fortawesome/free-solid-svg-icons';

/**
 * @returns Modal Component
 */
export const Modal = ({ content, visible, changeVisible, title }) => {
	return (
		visible && (
			<div className={`modal-overlay showOverlay`}>
				<div className={`modal showShadow`}>
					{title && (
						<div className='modal-header'>
							<div className='modal-title'>{title}</div>
							<Button
								icon={faX}
								onClick={() => changeVisible(false)}
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
