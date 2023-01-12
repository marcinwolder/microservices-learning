import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const currentUserRouter = Router();

interface UserData {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserData;
		}
	}
}

currentUserRouter.get(
	'/auth/currentUser',
	async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.currentUser);
		if (req.session?.jwt) {
			try {
				const userData = jwt.verify(
					req.session.jwt,
					process.env.JWT_KEY!
				) as UserData;
				req.currentUser = userData;
				return res.send(userData);
			} catch (error) {
				res.send({});
			}
		} else res.send({});
	}
);

export { currentUserRouter };
