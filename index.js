const app = require("./app");
const { PORT } = require("./utils/config");
const logger = require("./utils/logger");
// const PORT = process.env.PORT;

app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});