import request from 'supertest';
import { Ticket } from '../../../models/ticket';
import { app } from '../../app';

const url = '/api/tickets';

it('path accessible', async () => {
	const res = await request(app).post(url).send({});
	expect(res.statusCode).not.toBe(404);
});
it('returns error if not signed in', async () => {
	const res = await request(app).post(url).send({});
	expect(res.statusCode).toBe(401);
});
it('returns no error if signed in', async () => {
	const res = await request(app).post(url).set('Cookie', signIn()).send({});
	expect(res.statusCode).not.toBe(401);
});
it('returns error if invalid data send', async () => {
	//* title
	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			title: '',
			price: 10,
		})
		.expect(400);
	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			price: 10,
		})
		.expect(400);

	//* price
	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			title: 'important ticket',
			price: 'dwa',
		})
		.expect(400);
	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			title: 'important ticket',
			price: -3,
		})
		.expect(400);
	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			title: 'important ticket',
		})
		.expect(400);
});
it('creates ticket if everything is correct', async () => {
	let tickets = await Ticket.find({});
	expect(tickets.length).toBe(0);

	await request(app)
		.post(url)
		.set('Cookie', signIn())
		.send({
			title: 'important ticket',
			price: 10.28,
		})
		.expect(201);

	tickets = await Ticket.find({});
	expect(tickets.length).toBe(1);
});
