const noteRouter = require("express").Router();
const noteModel = require("../models/Note");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {

	const notes = await noteModel.find({});

	res.json(notes);
});

noteRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	// notes = notes.filter((note) => note.id.toString() !== id);
	await noteModel.findByIdAndDelete(id);

	res.status(204).end();
});

noteRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	// console.log(id);
	const note = await noteModel.findById(id);

	if(note) {
		res.json(note);
		return;
	}

	res.status(404).end();
});

noteRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { content, important } = req.body;

	const updatedNote = await noteModel.findByIdAndUpdate(
		id,
		{ content, important },
		{
			new: true,
			runValidators: true,
			context: "query"
		}
	);

	res.json(updatedNote);

});

const getTokenFrom = (req) => {
	const auth = req.get("authorization");

	if(!auth || !auth.startsWith("Bearer ")) return null;

	return auth.replace("Bearer ", "");
};

noteRouter.post("/", async (req, res) => {

	const body = req.body;
	const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

	if(!decodedToken.id) res.status(401).json({ error: "token invalid" });

	const user = await userModel.findById(decodedToken.id);

	const note = new noteModel({
		content: body.content,
		important: Boolean(body.important),
		user: user.id
	});

	const createdNote = await note.save();

	res.status(201).json(createdNote);

});

module.exports = noteRouter;