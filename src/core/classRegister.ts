import "reflect-metadata";

import { BindingScopeEnum, Container } from "inversify";


const ServiceContainer = new Container( {
  defaultScope: BindingScopeEnum.Singleton,
} );

export default ServiceContainer;
