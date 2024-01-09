const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const connectDB = () => {
	// if(process.argv.length < 3) process.exit(1);

	// const password = process.argv[2];

	// const url = `mongodb+srv://myAtlasDBUser:${password}@myatlasclusteredu.kguxzmt.mongodb.net/noteApp?retryWrites=true&w=majority`;
	mongoose.set("strictQuery", false);

	logger.info(`Connecting to ${MONGODB_URI}`);

	mongoose
		.connect(MONGODB_URI)
		.then(() => {
			logger.info("connected to MongoDB");
		})
		.catch((err) => {
			logger.error("Error connection to MongoDB:", err.message);
		});
};

module.exports = connectDB;