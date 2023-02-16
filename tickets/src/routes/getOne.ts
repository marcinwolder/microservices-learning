import { NotFoundError } from '@lmuml/common/build/errors/NotFoundError';
import { Router } from 'express';
import { Ticket } from '../../models/ticket';

const router = Router();

router.get('/api/tickets/:ticketId', async (req, res, next) => {
	const id = req.params.ticketId;

	const ticket = await Ticket.findById(id);
	if (ticket) {
		res.status(200).send(ticket);
	} else {
		next(new NotFoundError());
	}
});

export { router as getOnePath };
