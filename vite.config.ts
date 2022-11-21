import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, UserConfig } from 'vite';

// https://vitejs.dev/config/
const config = ({ mode }: UserConfig) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [react()]
	})
}

export default config
