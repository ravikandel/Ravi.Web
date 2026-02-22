import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { HealthCheckResponseV1 } from '../models/HealthCheckResponseV1';
import { HealthStatusEnumV1 } from '../models/HealthStatusEnumV1';

import { ObservableEnvironmentApi } from "./ObservableAPI";
import { EnvironmentApiRequestFactory, EnvironmentApiResponseProcessor} from "../apis/EnvironmentApi";

export interface EnvironmentApiGetEnvironmentRequest {
}

export class ObjectEnvironmentApi {
    private api: ObservableEnvironmentApi

    public constructor(configuration: Configuration, requestFactory?: EnvironmentApiRequestFactory, responseProcessor?: EnvironmentApiResponseProcessor) {
        this.api = new ObservableEnvironmentApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public getEnvironmentWithHttpInfo(param: EnvironmentApiGetEnvironmentRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.getEnvironmentWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public getEnvironment(param: EnvironmentApiGetEnvironmentRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.getEnvironment( options).toPromise();
    }

}

import { ObservableHealthCheckApi } from "./ObservableAPI";
import { HealthCheckApiRequestFactory, HealthCheckApiResponseProcessor} from "../apis/HealthCheckApi";

export interface HealthCheckApiHealthCheckV1Request {
}

export class ObjectHealthCheckApi {
    private api: ObservableHealthCheckApi

    public constructor(configuration: Configuration, requestFactory?: HealthCheckApiRequestFactory, responseProcessor?: HealthCheckApiResponseProcessor) {
        this.api = new ObservableHealthCheckApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health Check API
     * @param param the request object
     */
    public healthCheckV1WithHttpInfo(param: HealthCheckApiHealthCheckV1Request = {}, options?: ConfigurationOptions): Promise<HttpInfo<HealthCheckResponseV1>> {
        return this.api.healthCheckV1WithHttpInfo( options).toPromise();
    }

    /**
     * Health Check API
     * @param param the request object
     */
    public healthCheckV1(param: HealthCheckApiHealthCheckV1Request = {}, options?: ConfigurationOptions): Promise<HealthCheckResponseV1> {
        return this.api.healthCheckV1( options).toPromise();
    }

}
