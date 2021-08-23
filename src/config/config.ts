// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();


export const config = {
  productionMode: process.env["ENV"] === "production",
  port: process.env["PORT"] ? +process.env["PORT"] : 3000,
  dbConnectionString: process.env["DB_CONNECTION_STRING"] || "",
};
