const noteRouter = require("express").Router();
const noteModel = require("../models/Note");

noteRouter.get("/", (req, res, next) => {
	noteModel
		.find({})
		.then( (notes) => {
			res.json(notes);
		})
		.catch((err) => next(err));
});

noteRouter.delete("/:id", (req, res, next) => {
	const id = req.params.id;
	// notes = notes.filter((note) => note.id.toString() !== id);
	noteModel
		.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end();
		})
		.catch((err) => next(err));
});

noteRouter.get("/:id", (req, res, next) => {
	const id = req.params.id;
	// console.log(id);
	noteModel
		.findById(id)
		.then((note) => {
			if(note) {
				res.json(note);
				return;
			}

			res.status(404).end();
		})
		.catch((err) => next(err));
});

noteRouter.put("/:id", (req, res, next) => {
	const id = req.params.id;
	const { content, important } = req.body;

	noteModel
		.findByIdAndUpdate(
			id,
			{ content, important },
			{
				new: true,
				runValidators: true,
				context: "query"
			}
		)
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((err) => next(err));
});

noteRouter.post("/", (req, res, next) => {
	const body = req.body;

	const note = new noteModel({
		content: body.content,
		important: Boolean(body.important),
	});

	note
		.save()
		.then((createdNote) => {
			res.json(createdNote);
		})
		.catch((err) => next(err));
});

module.exports = noteRouter;