import { dev } from '$app/environment';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html',
		}),
		paths: {
			base: dev ? '' : Deno.env.get('BASE_PATH')
		}
	}
};

export default config;
