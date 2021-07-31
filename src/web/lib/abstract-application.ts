import http from "http";
import { Container } from "inversify";


export abstract class AbstractApplication {

  protected httpServer: http.Server | undefined

  constructor(protected readonly container: Container) {
    this.configureServices(container);
    this.setup();
  }
  abstract configureServices(container: Container): void
  abstract setup(): Promise<void> | void
  abstract close(): Promise<void> | void
}
