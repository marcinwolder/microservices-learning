export function useClientPath() {
	let path = '';
	if (typeof window === 'undefined') {
		path += 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
	}
	return path;
}
