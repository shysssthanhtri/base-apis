import express from "express";
import http from "http";

const app = async (): Promise<http.Server> => {
	const server = express();
	return	server.listen(3000, () => {
		console.log("Server is running");
	});
};

export { app };
