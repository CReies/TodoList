import React from 'react';
import { CreateTask } from './CreateTask';
import { Tasks } from './Tasks';

export const Main = () => {
	return (
		<section className='content'>
			<Tasks />
			<CreateTask />
		</section>
	);
};
