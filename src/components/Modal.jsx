import React from 'react';

export const Modal = ({
	content,
	visible,
	changeVisible,
	title,
	showHeader,
	showOverlay,
	showShadow,
}) => {
	return (
		visible && (
			<div
				className='modal-overlay'
				style={`background-color: ${showOverlay ? '#ffffff80' : '#ffffff00'}`}
			>
				<div
					className='modal'
					style={showShadow ? `box-shadow: 0 15px 50px 0 #00000060` : ''}
				>
					{showHeader && (
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
