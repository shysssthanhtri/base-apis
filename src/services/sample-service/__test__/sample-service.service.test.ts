import IoC, { IOC_NAME } from "infra/IoC";

import { SampleService } from "../sample-service.service";
import { ISampleService } from "../sample-service.service.interface";


describe("SampleService", () => {

  let service: ISampleService;

  beforeAll(() => {
    IoC.bind<ISampleService>(IOC_NAME.SAMPLE_SERVICE).to(SampleService);
    service = IoC.get<ISampleService>(IOC_NAME.SAMPLE_SERVICE);
  });


  describe("get", () => {
    it("should return correct result", () => {
      const input = "abcdef";
      const result = service.get(input);
      expect(result).toEqual(input);
    });
  });
});
