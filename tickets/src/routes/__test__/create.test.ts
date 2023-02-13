import request from 'supertest';
import { app } from '../../app';

const url = '/api/tickets';

it('path accessible', async () => {
	const res = await request(app).post(url).send({});
	expect(res.statusCode).not.toBe(404);
});
it('returns error if not signed in', async () => {});
it('returns no error if signed in', async () => {});
it('returns error if invalid data send', async () => {});
