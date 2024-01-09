const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const connectDB = () => {
	mongoose.set("strictQuery", false);

	logger.info(`Connecting to ${config.MONGODB_URI}`);

	mongoose
		.connect(config.MONGODB_URI)
		.then(() => {
			logger.info("connected to MongoDB");
		})
		.catch((err) => {
			logger.error("Error connection to MongoDB:", err.message);
		});
};

module.exports = connectDB;