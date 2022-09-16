import axios from 'axios';
import { useCallback, useState } from 'react';

/**
 * Fetches to an api using axios
 *
 * @returns An array with the response and the method to execute the fetch
 */
export const useFetchData = ({ method = 'get', url, data, headers, name }) => {
	// State for the response
	const [res, setRes] = useState({ data: [], error: null, isLoading: false });
	const resLS = localStorage.getItem(name);

	// Method to fetch the api
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
				const resLSModified = JSON.parse(resLS).concat(data);
				localStorage.setItem(name, JSON.stringify(resLSModified));
				return;
			}

			if (method === 'delete') {
				const resLSModified = JSON.parse(resLS);
				const urlSplited = url.split('/');
				const id = urlSplited[urlSplited.length - 1];
				const index = resLSModified.findIndex((task) => task._id === id);
				resLSModified.splice(index, 1);
				localStorage.setItem(name, JSON.stringify(resLSModified));
				return;
			}

			localStorage.setItem(name, JSON.stringify(response.data));
		});
	}, [method, url, data, headers, name]);

	// Method to get the data from local storage
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
