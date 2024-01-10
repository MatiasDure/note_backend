const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJson", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	}
});

module.exports = mongoose.model("User", userSchema);