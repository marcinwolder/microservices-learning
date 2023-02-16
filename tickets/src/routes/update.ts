import { BadRequestError } from '@lmuml/common/build/errors/BadRequestError';
import { expressValidatorError } from '@lmuml/common/build/middleware/express-validator-error';
import { requireAuth } from '@lmuml/common/build/middleware/require-auth';

import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../../models/ticket';

const router = Router();

router.put(
	'/api/tickets/:ticketId',
	requireAuth,
	[
		body('title').notEmpty().withMessage('Title is required'),
		body('price')
			.notEmpty()
			.withMessage('Price is required')
			.isFloat({ min: 0 })
			.withMessage('Price must be a number'),
	],
	expressValidatorError,
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, price } = req.body;
		const { id } = req.currentUser!;
		const { ticketId } = req.params;
		const ticket = await Ticket.findById(ticketId);
		if (!ticket) next(new BadRequestError('Ticket not found'));
		else if (ticket.userId != id)
			next(
				new BadRequestError(
					'You must be owner of the ticket to modify its data'
				)
			);
		else {
			ticket.set({ title, price });
			await ticket.save();
			res.status(200).send(ticket);
		}
	}
);

export { router as updatePath };
