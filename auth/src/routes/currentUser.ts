import { Router, Request, Response } from 'express';
import { currentUser } from '../middleware/current-user';

const currentUserRouter = Router();

currentUserRouter.get(
	'/auth/currentUser',
	currentUser,
	async (req: Request, res: Response) => {
		res.status(200).json(req.currentUser || null);
	}
);

export { currentUserRouter };
