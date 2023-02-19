import nats from 'node-nats-streaming';

const stan = nats.connect('lmuml', 'abc', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('publisher connected');

	const data = JSON.stringify({
		id: '123',
		title: 'concert',
		price: 20,
	});

	stan.publish('ticket:create', data, () => {
		console.log('event published');
	});
});
