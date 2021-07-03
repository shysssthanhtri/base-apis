import express from "express";

const app = async () => {
  const server = express();
  server.listen(3000, () => {
    console.log("Server is running");
  });
};

export { app };
