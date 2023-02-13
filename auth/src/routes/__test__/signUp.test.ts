import request from 'supertest';
import { app } from '../../app';

it('returns a cookie on successful signUp', async () => {
	const res = await request(app).post('/api/auth/signUp').send({
		email: 'marcinwolder7@gmail.com',
		password: 'Marcin1*',
	});
	expect(res.status).toBe(201);
	expect(res.get('Set-Cookie')).toBeDefined();
});

it('returns a 201 on successful signup', async () => {
	const res = await request(app).post('/api/auth/signUp').send({
		email: 'marcinwolder7@gmail.com',
		password: 'Marcin1*',
	});
	expect(res.status).toBe(201);
});

it('returns a 400 when bad data provided', async () => {
	await request(app)
		.post('/api/auth/signUp')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: '123', //weak password
		})
		.expect(400);
	await request(app)
		.post('/api/auth/signUp')
		.send({
			email: 'marcinwoldecom', //wrong email format
			password: 'Marcin1*',
		})
		.expect(400);
	await request(app)
		.post('/api/auth/signUp')
		.send({
			email: '', //no email
			password: 'Marcin1*',
		})
		.expect(400);
	await request(app)
		.post('/api/auth/signUp')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: '', //no password
		})
		.expect(400);
});
