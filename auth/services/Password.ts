import { hashSync, compareSync } from 'bcrypt';

export class Password {
	static hash(password: string) {
		return hashSync(password, 10);
	}

	static compare(storedPassword: string, password: string) {
		return compareSync(password, storedPassword);
	}
}
