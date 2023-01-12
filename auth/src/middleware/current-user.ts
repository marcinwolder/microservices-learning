import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next();
	}
	try {
		const userData = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserData;
		req.currentUser = userData;
	} catch (error) {}
	next();
};
