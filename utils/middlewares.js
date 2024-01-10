const logger = require("./logger");

const requestLogger = (req, res, next) => {
	const origin = `${req.protocol}://${req.hostname}${req.path}`;
	logger.info(`\n-----${req.method} request-----\n-----Origin: ${origin}-----\n-----Body: ${JSON.stringify(req.body)}-----\n`);
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
	logger.error(err.message);

	if(err.name === "CastError") return res.status(400).json({ error: "Malformatted id" });
	else if(err.name === "ValidationError") return res.status(400).json({ error: err.message });
	else if(err.name ===  "JsonWebTokenError") return res.status(401).json({ error: "Invalid token" });
	else if(err.name === "TokenExpiredError") return res.status(401).json({ error: "Token expired" });

	next(err);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
};
