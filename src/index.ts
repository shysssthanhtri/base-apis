import  "infra/sequelize";
import "reflect-metadata";

import { Application } from "app";
import IoC from "infra/IoC";


const main = async () => {
  new Application(IoC);
};

main();
