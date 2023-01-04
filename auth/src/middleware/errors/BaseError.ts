export interface ErrorTemplate {
	message: string;
	field?: string;
}

export abstract class BaseError extends Error {
	abstract statusCode: number;
	abstract generateError: () => ErrorTemplate;
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, BaseError.prototype);
	}
}
