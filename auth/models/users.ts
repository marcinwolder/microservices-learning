import mongoose from 'mongoose';
import { Password } from '../services/Password';

interface UserAttrs {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends UserAttrs, mongoose.Document {}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			versionKey: false,
			transform(doc, ret, options) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
			},
		},
	}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = Password.hash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
