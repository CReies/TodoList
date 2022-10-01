export interface ITask {
	_id: string;
	title: string;
	description: string;
	category: Category['_id'];
	completed: boolean;
	createdAt?: Date;
}

export interface ICategory {
	_id: string;
	title: string;
	description?: string;
	color: string;
	tasks: Array<Task>;
	createdAt?: Date;
}
