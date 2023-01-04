import { Request, Response, NextFunction } from 'express';
import { BaseError } from './BaseError';

export const handleErrors = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		res.status(err.statusCode).send(err.generateError());
	} else {
		res.status(400).send({ message: 'something went wrong' });
	}
};
