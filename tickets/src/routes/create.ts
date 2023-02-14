import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, expressValidatorError } from '@lmuml/common';
import { Ticket } from '../../models/ticket';

const router = Router();
router.post(
	'/api/tickets',
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
	async (req: Request, res: Response) => {
		const { title, price } = req.body;
		const userId = req.currentUser?.id!;
		const ticket = Ticket.build({ title, price, userId });
		await ticket.save();
		res.status(201).send(ticket);
	}
);

export { router as createPath };
