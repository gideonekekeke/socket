const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const likeModel = require("../Models/likeModel");
const router = express.Router();

router.get("/", async (req, res) => {
	const user = await userModel.find().sort({ createdAt: -1 });

	res.json(user);
});

router.post("/", async (req, res) => {
	const user = await userModel.create(req.body);

	res.json(user);
});

router.get("/:id/like", async (req, res) => {
	const getUser = await userModel.findById(req.params.id);
	const createLike = new likeModel({ user: req.params.id });

	createLike.user = getUser;

	createLike.save();

	getUser.like.push(mongoose.Types.ObjectId(createLike._id));

	getUser.save();

	res.json({
		message: "successfull",
		data: createLike,
	});
});

module.exports = router;
