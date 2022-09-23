import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalContent } from '../reducers/modalReducer';
import Modal from './Modal';
import Tabs from './Tabs';
import Tasks from './Tasks';

/**
 * @returns Main Component
 */
const Main = () => {
	const dispatch = useDispatch();

	const tabsValueState = useSelector((state) => state.tabs.value);

	const modalTitle = <Tabs tabs={['Category', 'Task']} />;

	useEffect(() => {
		dispatch(setModalContent(tabsValueState));
	}, [tabsValueState]);

	return (
		<section className='content'>
			<Modal title={modalTitle} />
			<Tasks />
		</section>
	);
};

export default Main;
