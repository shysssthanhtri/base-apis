import http from "http";

export const shutdown = (app: http.Server): void => {
	console.log("\nShutting down...");
	app.close();
};
