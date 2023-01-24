import mongoose, { Schema } from 'mongoose';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
	username: String,
	hashedPassword: String,
});

UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

UserSchema.methods.setPassword = async function (password) {
	const hash = await bycrpt.hash(password, 10);
	this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
	const result = await bycrpt.compare(password, this.hashedPassword);
	return result;
};

UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		},
	);
	return token;
};

UserSchema.methods.serialise = function () {
	const data = this.toJSON();
	delete data.hashedPassword;
	return data;
};

const User = mongoose.model('User', UserSchema);
export default User;
