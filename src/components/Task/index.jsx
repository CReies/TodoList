import React from 'react';

const Task = ({ task, index }) => {
	return (
		<>
			<div>#{index}</div>
			<div>{task.title}</div>
      <div>{task.category}</div>
      <hr />
		</>
	);
};

export default Task;
