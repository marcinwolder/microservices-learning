import { Router, Request, Response } from 'express';
import { currentUser } from '@lmuml/common';

const currentUserRouter = Router();

currentUserRouter.get(
	'/api/auth/currentUser',
	currentUser,
	async (req: Request, res: Response) => {
		res.status(200).json(req.currentUser || null);
	}
);

export { currentUserRouter };
