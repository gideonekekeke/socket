const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},

		like: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "likes",
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", likeSchema);
