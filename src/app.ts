import compression from "compression";
import { getDynamicConfig } from "config/dynamic-config";
import express from "express";
import { IOC_NAME } from "infra/IoC";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { ISampleService, SampleService } from "services/sample-service";
import { AbstractApplication } from "web/lib/abstract-application";


export class Application extends AbstractApplication {

  configureServices(container: Container): void {
    container.bind<ISampleService>(IOC_NAME.SAMPLE_SERVICE).to(SampleService);
  }

  async setup(): Promise<void> {

    const server = new InversifyExpressServer(this.container);

    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true , }));
      if (getDynamicConfig("ENV") === "PRODUCTION") {
        app.use(compression());
      }
    });

    const app = server.build();

    const port = getDynamicConfig("PORT") || 3000;
    this.httpServer = app.listen(port, () => {
      console.log(
        `server is running on http://localhost:${port}`
      );
    });
  }

  close(): void {
    if (this.httpServer) {
      this.httpServer.close();
    }
  }

}
