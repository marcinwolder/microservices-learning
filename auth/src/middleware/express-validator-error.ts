import { Response, Request, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ValidationErrors } from '../errors';

export const expressValidatorError = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!validationResult(req).isEmpty()) {
		const errors = validationResult(req).array() as ValidationError[];
		throw new ValidationErrors(errors);
	} else next();
};
