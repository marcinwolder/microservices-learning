import request from 'supertest';
import { app } from '../../app';

it('returns a 200 and cookie for valid login data', async () => {
	await global.signup();
	const res = await request(app)
		.post('/api/auth/signIn')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: 'Marcin1*',
		})
		.expect(200);
	expect(res.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 for unknown email', async () => {
	await request(app)
		.post('/api/auth/signIn')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: 'Marcin1*',
		})
		.expect(400);
});

it('returns a 400 for wrong password', async () => {
	await global.signup();
	await request(app)
		.post('/api/auth/signIn')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: '123',
		})
		.expect(400);
});
