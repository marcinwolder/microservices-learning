import request from 'supertest';
import { app } from '../../app';

it('returns cookie for signed in user', async () => {
	const cookies = await global.signup();

	const res = await request(app)
		.get('/auth/currentUser')
		.set('Cookie', cookies)
		.send({})
		.expect(200);

	expect(res.body.email).toBeDefined();
});
it('returns no cookie for logged out user', async () => {
	const res = await request(app).get('/auth/currentUser').send({}).expect(200);

	expect(res.body).toBeNull();
});
