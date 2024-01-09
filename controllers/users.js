const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const userModel = require("../models/User");

userRouter.post("/", async (req, res, next) => {
    try {
        const { username, name, password } = req.body;
        
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            username,
            name,
            passwordHash,
        });

        const savedUser = await newUser.save();

        response.status(201).json(savedUser);
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;