import "winston-daily-rotate-file";

import { config } from "config/config";
import winston from "winston";


export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  ],
});

if (config.productionMode) {
  logger.add(new winston.transports.File({
    level: "info",
    filename: "info.log",
    maxsize: 5242880, //5MB
    maxFiles: 5,
    format: winston.format.simple(),
  }));
  logger.add(new winston.transports.File({
    filename: "error.log",
    level: "error",
    maxsize: 5242880, //5MB
    maxFiles: 5,
    format: winston.format.simple(),
  }));
}
