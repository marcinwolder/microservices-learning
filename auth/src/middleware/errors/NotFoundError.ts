import { BaseError, ErrorTemplate } from './BaseError';

export class NotFoundError extends BaseError {
	generateError: () => ErrorTemplate = () => ({ message: 'Site not found!' });
	statusCode = 404;

	constructor() {
		super('Site not found!');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
