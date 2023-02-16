import request from 'supertest';
import { Ticket } from '../../../models/ticket';
import { app } from '../../app';

const url = '/api/tickets';

it('path accessible', async () => {
	const { id } = await createTicket();
	const res = await request(app)
		.put(url + '/' + id)
		.send({});
	expect(res.statusCode).not.toBe(404);
});
it('returns error if not signed in', async () => {
	const { id } = await createTicket();
	await request(app)
		.put(url + '/' + id)
		.send({})
		.expect(401);
});
it('returns error if signed in with wrong account', async () => {
	const { id } = await createTicket({ id: 10 });
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', signIn())
		.send({
			title: 'ticket',
			price: 10,
		})
		.expect(400);
});
it('returns error if no ticket with given name for such user is found', async () => {
	const ticket = await createTicket();
	const _id = ticket.id;
	await Ticket.deleteOne({ _id });

	await request(app)
		.put(url + '/' + _id)
		.set('Cookie', signIn())
		.send({
			title: 'ticket',
			price: 10,
		})
		.expect(400);
});
it('returns error if invalid data send', async () => {
	const { id } = await createTicket({ id: 10 });
	const userCookie = signIn(10);
	//* title
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', userCookie)
		.send({
			title: '',
			price: 10,
		})
		.expect(400);
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', userCookie)
		.send({
			price: 10,
		})
		.expect(400);

	//* price
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', userCookie)
		.send({
			title: 'important ticket',
			price: 'dwa',
		})
		.expect(400);
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', userCookie)
		.send({
			title: 'important ticket',
			price: -3,
		})
		.expect(400);
	await request(app)
		.put(url + '/' + id)
		.set('Cookie', userCookie)
		.send({
			title: 'important ticket',
		})
		.expect(400);
});
it('updates ticket data if everything is correct', async () => {
	const { id } = await createTicket();
	const title = 'TEST TITLE';
	const price = 1234;
	const { body } = await request(app)
		.put(url + '/' + id)
		.set('Cookie', signIn())
		.send({
			title,
			price,
		})
		.expect(200);
	expect(body.price).toEqual(price);
	expect(body.title).toEqual(title);
});
