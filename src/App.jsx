import React from 'react';
import './assets/css/App.css';
import Header from './components/Header/';
import Tasks from './components/Tasks';

const App = () => {
	return (
		<>
			<aside>
				<Header />
				<Tasks />
			</aside>
		</>
	);
};

export default App;
