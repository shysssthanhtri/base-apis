import { app } from "./app";

const main = async () => {
	const server =	await app();

	process.on("SIGINT", () => {
		console.log("Shutting down...");
		server.close();
	});

	process.on("SIGTERM", () => {
		console.log("Shutting down...");
		server.close();
	});
};

main();
