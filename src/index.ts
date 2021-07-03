import { app } from "./app";
import { shutdown } from "./core/shutdown";

const main = async () => {
	
	const server = await app();

	process.on("SIGINT", () => shutdown(server));
	process.on("SIGTERM", () => shutdown(server));

};

main();
