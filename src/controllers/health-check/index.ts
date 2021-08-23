import { controller, httpGet, interfaces } from "inversify-express-utils";


@controller("/heath-check")
export class HealthCheckController implements interfaces.Controller {

  @httpGet("/ping")
  ping(): string {
    return "pong";
  }
}
