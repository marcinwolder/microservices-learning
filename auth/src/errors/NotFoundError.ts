import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
	generateError = () => [{ message: 'Site not found!' }];
	statusCode = 404;

	constructor() {
		super('Site not found!');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
