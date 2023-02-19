import nats from 'node-nats-streaming';

const stan = nats.connect('lmuml', '123', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('listener connected');

	const sub = stan.subscribe('ticket:create');
	sub.on('message', (msg) => {
		console.log('message recieved', msg);
	});
});
