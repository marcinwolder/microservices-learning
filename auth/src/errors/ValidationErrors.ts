import { BaseError } from '.';
import { ValidationError } from 'express-validator';

export class ValidationErrors extends BaseError {
	generateError = () => {
		return this.errors.map((err) => ({ message: err.msg, field: err.param }));
	};
	statusCode = 400;

	constructor(public errors: ValidationError[]) {
		super('validation error');

		Object.setPrototypeOf(this, ValidationErrors.prototype);
	}
}
