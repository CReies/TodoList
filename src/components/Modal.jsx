import React from 'react';

export const Modal = ({ content, visible, changeVisible, title }) => {
	return (
		visible && (
			<div className={`modal-overlay showOverlay`}>
				<div className={`modal showShadow`}>
					{title && (
						<div className='modal-header'>
							<h3>{title}</h3>
							<button onClick={() => changeVisible(false)}>X</button>
						</div>
					)}
					<div className='modal-content'>{content}</div>
				</div>
			</div>
		)
	);
};
