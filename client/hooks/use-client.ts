import axios from 'axios';

export function useClient() {
	let path = '';
	if (typeof window === 'undefined') {
		path += 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
	}
	return axios.create({
		baseURL: path,
		withCredentials: true,
	});
}
