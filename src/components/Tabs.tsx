import { useDispatch, useSelector } from 'react-redux';
import { setTabsValue } from '../features/tabs/tabsSlice';
import type { RootState } from '../store';
import type { TabsState } from '../features/tabs/tabsSlice';

interface Props {
	tabs: string[];
}

// Tabs Element
const Tabs = (props: Props) => {
	const { tabs } = props;
	const dispatch = useDispatch();
	const tabsValue = useSelector((state: RootState) => state.tabs.value);

	const handleChangeTab = (value: TabsState['value']) => {
		dispatch(setTabsValue(value));
	};

	const tabRender = tabs.map((localTabName) => (
		<span
			key={localTabName}
			className={localTabName === tabsValue ? 'active' : ''}
			onClick={() => handleChangeTab(localTabName)}
		>
			{localTabName}
		</span>
	));

	return <div className='tabs'>{tabRender}</div>;
};

export default Tabs;
