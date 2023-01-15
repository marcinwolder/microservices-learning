import '@/styles/globals.css';
import type { AppProps, AppType } from 'next/app';

const App: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<nav>Navigation</nav>
			<Component {...pageProps} />
		</>
	);
};

App.getInitialProps = async ({ ctx: { req } }) => {
	let url = '';
	if (typeof window === 'undefined')
		url += 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
	url += '/auth/currentUser';

	const currentUser = await fetch(url, {
		cache: 'no-cache',
		method: 'GET',
	}).then((res) => res.json());

	return {};
};

export default App;
