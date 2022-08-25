import React from 'react';

export const Modal = ({ content, visible, changeVisible, title }) => {
	return (
		visible && (
			<div className={`modal-overlay showOverlay`}>
				<div className={`modal showShadow`}>
					{title && (
						<div className='modal-header'>
							<h3>{title}</h3>
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
