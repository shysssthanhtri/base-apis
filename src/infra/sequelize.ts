import { config } from "config/config";
import { Sequelize } from "sequelize";
import { logger } from "utils/logger";


export const sequelize = new Sequelize(config.dbConnectionString, {
  logging: (sql) => logger.info(sql),
});

sequelize.authenticate()
  .then(() => {
    logger.info("Connected");
  })
  .catch(error => {
    logger.error(error);
  });
