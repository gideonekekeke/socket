require("./Utils/db");
const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" }, pingTimeout: 90000 });

app.use(express.json());
app.use(cors());

app.use("/api/", require("./Router/router"));

const db = mongoose.connection;

db.on("open", () => {
	const observer = db.collection("users").watch();
	observer.on("change", (change) => {
		if (change.operationType === "insert") {
			const newData = {
				name: change.fullDocument.name,
				_id: change.fullDocument._id,
				like: change.fullDocument.like,
				createdAt: change.fullDocument.createdAt,
			};
			console.log(change.fullDocument);
			io.emit("newEntry", newData);
		}
	});
});

io.on("connection", (socket) => {
	// console.log("user connected", socket.id);

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
