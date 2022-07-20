const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = mongoose.model("likes", likeSchema);
