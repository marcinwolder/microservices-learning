import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export class Password {
	static hash(password: string) {
		const salt = genSaltSync();
		const hashedPassword = hashSync(password, salt);
		return `${hashedPassword}.${salt}`;
	}

	static compare(storedPassword: string, password: string) {
		const [hashedPassword, salt] = storedPassword.split('.');
		return compareSync(password.concat(salt), hashedPassword);
	}
}
