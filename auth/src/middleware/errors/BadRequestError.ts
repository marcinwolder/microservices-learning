import { BaseError, ErrorTemplate } from './BaseError';

export class BadRequestError extends BaseError {
	generateError: () => ErrorTemplate = () => ({ message: this.message });
	statusCode = 400;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}
