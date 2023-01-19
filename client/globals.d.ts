interface apiError {
	message: string;
	field?: string;
}

interface errResponse {
	errors: apiError[];
}
