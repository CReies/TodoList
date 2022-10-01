import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalContent } from '../features/modal/modalSlice';
import { setTabs } from '../features/tabs/tabsSlice';
import Modal from './Modal';
import Tabs from './Tabs';
import Tasks from './Tasks';
import type { RootState } from '../store';

// Main Component
const Main = () => {
	const dispatch = useDispatch();

	const tabsValue = useSelector((state: RootState) => state.tabs.value);

	useEffect(() => {
		dispatch(setModalContent(tabsValue));
		dispatch(setTabs(['Category', 'Task']));
	}, [tabsValue]);

	const modalTitle = <Tabs />;

	return (
		<section className='content'>
			<Modal title={modalTitle} />
			<Tasks />
		</section>
	);
};

export default Main;
