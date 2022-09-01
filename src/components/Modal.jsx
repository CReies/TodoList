import React from 'react';

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
							<h2>{title}</h2>
							<button
								className='modal-close'
								onClick={() => changeVisible(false)}
							>
								x
							</button>
						</div>
					)}
					<div className='modal-content'>{content}</div>
				</div>
			</div>
		)
	);
};
