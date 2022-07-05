import React from 'react';
import './assets/css/App.css';
import Calendar from './components/Calendar';
import Header from './components/Header/';
import Tasks from './components/Tasks';

const App = () => {
	return (
		<>
			<aside>
				<Header />
				<Tasks />
			</aside>
			<main>
				<h1>Calendar</h1>
				<Calendar/>
			</main>
			<aside>
				<h1>Detail</h1>
			</aside>
		</>
	);
};

export default App;
