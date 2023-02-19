import nats from 'node-nats-streaming';

const stan = nats.connect('lmuml', 'abc', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('connected');
});
