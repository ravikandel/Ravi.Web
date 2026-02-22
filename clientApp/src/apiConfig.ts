import * as api from "./api";
import type { ConfigurationParameters } from "./api/configuration";
import { ServerConfiguration } from "./api";
import { isDevelopment } from "./environment.ts";

const configurationParameters: ConfigurationParameters = {
    //development required backend {BE) address specified, once deployed the base address is the same for FE and BE

    baseServer: new ServerConfiguration<{}>(isDevelopment ? "https://localhost:7090/api" : "/api", {}),
};

const apiConfig = api.createConfiguration(configurationParameters);

export default apiConfig;