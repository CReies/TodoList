import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ icon, onClick, text, id, className, color }) => {
	const buttonRender = (
		<button onClick={onClick} id={id} className={className}>
			{icon ? <FontAwesomeIcon icon={icon} color={color} /> : ''}
			{text ? text : ''}
		</button>
	);

	return buttonRender;
};

export default Button;
