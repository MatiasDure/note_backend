require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === "test"
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI;

const env = {
	MONGODB_URI,
	PORT
};

module.exports = env;