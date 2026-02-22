import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

import { HealthCheckResponseV1 } from '../models/HealthCheckResponseV1';
import { HealthStatusEnumV1 } from '../models/HealthStatusEnumV1';
import { ObservableEnvironmentApi } from './ObservableAPI';

import { EnvironmentApiRequestFactory, EnvironmentApiResponseProcessor} from "../apis/EnvironmentApi";
export class PromiseEnvironmentApi {
    private api: ObservableEnvironmentApi

    public constructor(
        configuration: Configuration,
        requestFactory?: EnvironmentApiRequestFactory,
        responseProcessor?: EnvironmentApiResponseProcessor
    ) {
        this.api = new ObservableEnvironmentApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public getEnvironmentWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getEnvironmentWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public getEnvironment(_options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getEnvironment(observableOptions);
        return result.toPromise();
    }


}



import { ObservableHealthCheckApi } from './ObservableAPI';

import { HealthCheckApiRequestFactory, HealthCheckApiResponseProcessor} from "../apis/HealthCheckApi";
export class PromiseHealthCheckApi {
    private api: ObservableHealthCheckApi

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthCheckApiRequestFactory,
        responseProcessor?: HealthCheckApiResponseProcessor
    ) {
        this.api = new ObservableHealthCheckApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health Check API
     */
    public healthCheckV1WithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<HealthCheckResponseV1>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.healthCheckV1WithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Health Check API
     */
    public healthCheckV1(_options?: PromiseConfigurationOptions): Promise<HealthCheckResponseV1> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.healthCheckV1(observableOptions);
        return result.toPromise();
    }


}



