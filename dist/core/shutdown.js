"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdown = void 0;
var shutdown = function (app) {
    console.log("\nShutting down...");
    app.close();
};
exports.shutdown = shutdown;
