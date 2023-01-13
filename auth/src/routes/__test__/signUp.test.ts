import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
	await request(app)
		.post('/api/auth/signUp')
		.send({
			email: 'marcinwolder7@gmail.com',
			password: 'Marcin1*',
		})
		.expect(201);
});
