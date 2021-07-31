import { injectable } from "inversify";

import { ISampleService } from "./sample-service.service.interface";


@injectable()
export class SampleService implements ISampleService {

  get = (input: string): string => (
    input
  )

}
