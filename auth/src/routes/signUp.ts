import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validationResult, ValidationError } from 'express-validator';
import jwt from 'jsonwebtoken';

import { ValidationErrors, BadRequestError } from '../middleware/errors';
import { User } from '../../models/users';

const signUpRouter = Router();

signUpRouter.post(
	'/auth/signUp',
	[
		body('password')
			.trim()
			.notEmpty()
			.withMessage('enter password')
			.isStrongPassword()
			.withMessage('use stronger password')
			.isLength({ min: 8 })
			.withMessage('password must be at least 8 chars long'),
		body('email')
			.trim()
			.notEmpty()
			.withMessage('enter email')
			.isEmail()
			.withMessage('use right email format'),
	],
	async (req: Request, res: Response, next: NextFunction) => {
		if (!validationResult(req).isEmpty()) {
			const errors = validationResult(req).array() as ValidationError[];
			return next(new ValidationErrors(errors));
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			return next(new BadRequestError('email in use'));
		}

		const newUser = User.build({ email, password });
		await newUser.save();

		req.session = {
			jwt: jwt.sign(newUser.toJSON(), process.env.JWT_KEY!),
		};

		res.status(201).json(newUser);
	}
);

export { signUpRouter };
