import React from 'react';

export const Tabs = ({ tabs, tabState }) => {
	const [tabName, setTab] = tabState;

	const handleClick = (e, tabName) => {
		setTab(tabName);
	};

	const tabRender = tabs.map((localTabName) => (
		<span
			key={localTabName}
			className={localTabName === tabName ? 'active' : ''}
			onClick={(e) => handleClick(e, localTabName)}
		>
			{localTabName}
		</span>
	));

	return <div className='tabs'>{tabRender}</div>;
};
