require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./mongoConn");
const middlewares = require("./middlewares");
// const noteModel = require("./models/Note");
const userRouter = require("./controllers/users");
const noteRouter = require("./controllers/notes");
const app = express();

dbConnection();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// const requestLogger = (req, res, next) => {
// 	const origin = `${req.protocol}://${req.hostname}${req.path}`;
// 	console.log(`\n-----${req.method} request-----\n-----Origin: ${origin}-----\n-----Body: ${JSON.stringify(req.body)}-----\n`);
// 	next();
// };

app.use(middlewares.requestLogger);

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

// app.get("/api/notes", (req, res, next) => {
// 	noteModel
// 		.find({})
// 		.then( (notes) => {
// 			res.json(notes);
// 		})
// 		.catch((err) => next(err));
// });

// app.delete("/api/notes/:id", (req, res, next) => {
// 	const id = req.params.id;
// 	// notes = notes.filter((note) => note.id.toString() !== id);
// 	noteModel
// 		.findByIdAndDelete(id)
// 		.then(() => {
// 			res.status(204).end();
// 		})
// 		.catch((err) => next(err));
// });

// app.get("/api/notes/:id", (req, res, next) => {
// 	const id = req.params.id;
// 	// console.log(id);
// 	noteModel
// 		.findById(id)
// 		.then((note) => {
// 			if(note) {
// 				res.json(note);
// 				return;
// 			}

// 			res.status(404).end();
// 		})
// 		.catch((err) => next(err));
// });

// app.put("/api/notes/:id", (req, res, next) => {
// 	const id = req.params.id;
// 	const { content, important } = req.body;

// 	noteModel
// 		.findByIdAndUpdate(
// 			id,
// 			{ content, important },
// 			{
// 				new: true,
// 				runValidators: true,
// 				context: "query"
// 			}
// 		)
// 		.then((updatedNote) => {
// 			res.json(updatedNote);
// 		})
// 		.catch((err) => next(err));
// });

// app.post("/api/notes", (req, res, next) => {
// 	const body = req.body;

// 	const note = new noteModel({
// 		content: body.content,
// 		important: Boolean(body.important),
// 	});

// 	note
// 		.save()
// 		.then((createdNote) => {
// 			res.json(createdNote);
// 		})
// 		.catch((err) => next(err));
// });

// const unknownEndpoint = (req, res) => {
// 	res.status(404).send({ error: "Unknown endpoint" });
// };

app.use(middlewares.unknownEndpoint);

// const errorHandler = (err, req, res, next) => {
// 	console.log(err.message);

// 	if(err.name === "CastError") return res.status(400).json({ error: "malformatted id" });
// 	else if(err.name === "ValidationError") return res.status(400).json({ error: err.message });

// 	next(err);
// };

app.use(middlewares.errorHandler);


const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
