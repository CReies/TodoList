import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { MouseEventHandler } from 'react';

interface Props {
	icon?: IconDefinition;
	onClick: MouseEventHandler;
	text?: string;
	id: string;
	className: string;
	color?: string;
}

// Button Component
const Button = (props: Props) => {
	const { icon, onClick, text, id, className, color } = props;

	const buttonRender = (
		<button onClick={onClick} id={id} className={className}>
			{icon ? <FontAwesomeIcon icon={icon} color={color} /> : ''}
			{text ? text : ''}
		</button>
	);

	return buttonRender;
};

export default Button;
