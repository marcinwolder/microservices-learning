import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';

export const handleErrors = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		res.status(err.statusCode).send({ errors: err.generateError() });
	} else {
		res.status(400).send({ message: 'something went wrong' });
	}
};
