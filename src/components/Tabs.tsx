import { useDispatch, useSelector } from 'react-redux';
import { setTabsValue } from '../features/tabs/tabsSlice';
import type { RootState } from '../store';
import type { TabsState } from '../features/tabs/tabsSlice';

// Tabs Element
const Tabs = () => {
	const dispatch = useDispatch();

	const tabs = useSelector((state: RootState) => state.tabs);

	const handleChangeTab = (value: TabsState['value']) => {
		dispatch(setTabsValue(value));
	};

	const tabRender = tabs.data.map((localTabName) => (
		<span
			key={localTabName}
			className={localTabName === tabs.value ? 'active' : ''}
			onClick={() => handleChangeTab(tabs.value)}
		>
			{localTabName}
		</span>
	));

	return <div className='tabs'>{tabRender}</div>;
};

export default Tabs;
