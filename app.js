const express = require("express");
const cors = require("cors");
const dbConnection = require("./mongoConn");
require("express-async-errors");
const middlewares = require("./utils/middlewares");
const userRouter = require("./controllers/users");
const noteRouter = require("./controllers/notes");
const app = express();

dbConnection();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middlewares.requestLogger);

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;