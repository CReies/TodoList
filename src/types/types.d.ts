export interface ITask {
	_id: string;
	title: string;
	description: string;
	category: ICategory['_id'];
	completed: boolean;
	createdAt?: Date;
}

export interface ICategory {
	_id: string;
	title: string;
	description?: string;
	color: string;
	tasks: Task[];
	createdAt?: Date;
}

export interface IUser {
	_id: string;
	username: string;
	password: string;
}
