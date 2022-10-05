import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import App from './App';
import { $ } from './util/functions';

ReactDOM.createRoot($('#root') as HTMLElement).render(
	<Provider store={store}>
		<App />
	</Provider>
);
