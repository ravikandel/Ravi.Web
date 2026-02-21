import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { HealthCheckResponseV1 } from '../models/HealthCheckResponseV1';
import { HealthStatusEnumV1 } from '../models/HealthStatusEnumV1';

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
