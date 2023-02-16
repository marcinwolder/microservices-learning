import { BadRequestError } from '@lmuml/common/build/errors/BadRequestError';
import { requireAuth } from '@lmuml/common/build/middleware/require-auth';
import { Router } from 'express';
import { Ticket } from '../../models/ticket';

const router = Router();

router.get('/api/tickets/:ticketId', requireAuth, async (req, res, next) => {
	const { ticketId } = req.params;

	const ticket = await Ticket.findOne({ _id: ticketId });
	if (ticket) {
		res.status(200).send(ticket);
	} else {
		next(new BadRequestError("Can't find ticket with given id"));
	}
});

export { router as getOnePath };
