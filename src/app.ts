import express from "express";
import http from "http";

const app = async (): Promise<http.Server> => {
	const server = express();

	server.use("/ping", (req, res) => {
		console.log(req.url);
		res.send("PONG");
	});

	return	server.listen(3000, () => {
		console.log("Server is running...");
	});
};

export { app };
