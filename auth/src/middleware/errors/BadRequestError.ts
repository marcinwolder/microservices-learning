import { BaseError, ErrorTemplate } from './BaseError';

export class BadRequestError extends BaseError {
	generateError: () => ErrorTemplate = () => ({
		message: this.message,
		field: this.field,
	});
	statusCode = 400;

	constructor(public message: string, public field?: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}
