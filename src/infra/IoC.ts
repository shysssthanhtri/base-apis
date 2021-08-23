import "reflect-metadata";

import { BindingScopeEnum, Container } from "inversify";


const IoC = new Container({
  defaultScope: BindingScopeEnum.Singleton,
});

export enum IOC_NAME {
  TITLE_PERSISTENCE = "title-persistence"
}

export default IoC;
