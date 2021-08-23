import "controllers/health-check";

import compression from "compression";
import { config } from "config/config";
import express from "express";
import helmet from "helmet";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import { logger } from "utils/logger";
import { AbstractApplication } from "web/lib/abstract-application";


export class Application extends AbstractApplication {

  configureServices(container: Container): void {
    logger.info(!!container);
    // container.bind<ITitlePersistence>(IOC_NAME.TITLE_PERSISTENCE).to(TitlePersistence);
  }

  async setup(): Promise<void> {

    const server = new InversifyExpressServer(this.container);

    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true , }));
      app.use(morgan("combined", {
        stream: {
          write: (message) => logger.info(message),
        },
      }));
      if (config.productionMode) {
        app.use(compression());
        app.use(helmet());
      }
    });

    const app = server.build();

    this.httpServer = app.listen(config.port, () => {
      logger.info(
        `server is running on http://localhost:${config.port}`
      );
    });
  }

  close(): void {
    if (this.httpServer) {
      this.httpServer.close();
    }
  }

}
