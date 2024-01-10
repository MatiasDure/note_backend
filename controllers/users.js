const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const userModel = require("../models/User");

userRouter.get("/", async (req, res) => {
	const users = await userModel.find({});
	res.json(users);
});

userRouter.post("/", async (req, res) => {

	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = new userModel({
		username,
		name,
		passwordHash,
	});

	const savedUser = await newUser.save();

	res.status(201).json(savedUser);

});

module.exports = userRouter;