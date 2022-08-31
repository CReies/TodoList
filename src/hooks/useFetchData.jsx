import axios from 'axios';
import { useCallback, useState } from 'react';

export const useFetchData = ({ method = 'get', url, data, headers, name }) => {
	const [res, setRes] = useState({ data: [], error: null, isLoading: false });
	const resLS = localStorage.getItem(name);

	const callAPI = useCallback(() => {
		setRes((prevstate) => ({ ...prevstate, isLoading: true }));
		const options = { method, url, data, headers };
		axios.request(options).then((response) => {
			setRes((prevstate) => ({
				...prevstate,
				data: response.data,
				isLoading: false,
			}));
			if (method === 'post') {
				console.log('first');
				console.log(name);
				localStorage.removeItem(name);
				return;
			}
			localStorage.setItem(name, JSON.stringify(response.data));
		});
	}, [method, url, data, headers, name]);

	const getDataFromLS = () => {
		setRes((prevstate) => ({
			...prevstate,
			data: JSON.parse(resLS),
			isLoading: false,
		}));
	};

	let methodReturned = resLS && method === 'get' ? getDataFromLS : callAPI;

	return [res, methodReturned];
};
