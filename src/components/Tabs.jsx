import { useDispatch, useSelector } from 'react-redux';
import { setTabsValue } from '../reducers/tabsReducer';

const Tabs = ({ tabs }) => {
	const dispatch = useDispatch();
	const tabsValue = useSelector((state) => state.tabs.value);

	const handleClick = (e, value) => {
		dispatch(setTabsValue(value));
	};

	const tabRender = tabs.map((localTabName) => (
		<span
			key={localTabName}
			className={localTabName === tabsValue ? 'active' : ''}
			onClick={(e) => handleClick(e, localTabName)}
		>
			{localTabName}
		</span>
	));

	return <div className='tabs'>{tabRender}</div>;
};

export default Tabs;
