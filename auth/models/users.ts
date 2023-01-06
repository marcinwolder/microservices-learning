import mongoose from 'mongoose';

interface userAttrs {
	email: string;
	password: string;
}
interface userDoc extends userAttrs, mongoose.Document {}
interface userModel extends mongoose.Model<userDoc> {
	build(attrs: userAttrs): userDoc;
}

const userSchema = new mongoose.Schema<userDoc, userModel>({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model<userDoc, userModel>('User', userSchema);

userSchema.statics.build = (attrs: userAttrs) => {
	return new User(attrs);
};

export { User };
