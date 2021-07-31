import { Application } from "app";
import IoC from "infra/IoC";


const main = async () => {

  const application = new Application(IoC);

  process.on("SIGINT", () => {
    console.log("Shutting down...");
    application.close();
  });

  process.on("SIGTERM", () => {
    console.log("Shutting down...");
    application.close();
  });
};

main();
