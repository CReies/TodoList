import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalContent } from '../features/modal/modalSlice';
import Modal from './Modal';
import Tabs from './Tabs';
import Tasks from './Tasks';
import type { RootState } from '../store';

// Main Component
const Main = (): JSX.Element => {
	const dispatch = useDispatch();

	const tabsValue = useSelector((state: RootState) => state.tabs.value);

	useEffect(() => {
		dispatch(setModalContent(tabsValue));
	}, [tabsValue]);

	const modalTitle = <Tabs tabs={['Category', 'Task']} />;

	return (
		<section className='content'>
			<Modal title={modalTitle} />
			<Tasks />
		</section>
	);
};

export default Main;
