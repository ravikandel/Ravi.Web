import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { HealthCheckResponseV1 } from '../models/HealthCheckResponseV1';
import { HealthStatusEnumV1 } from '../models/HealthStatusEnumV1';

import { HealthCheckApiRequestFactory, HealthCheckApiResponseProcessor} from "../apis/HealthCheckApi";
export class ObservableHealthCheckApi {
    private requestFactory: HealthCheckApiRequestFactory;
    private responseProcessor: HealthCheckApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthCheckApiRequestFactory,
        responseProcessor?: HealthCheckApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new HealthCheckApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new HealthCheckApiResponseProcessor();
    }

    /**
     * Health Check API
     */
    public healthCheckV1WithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<HealthCheckResponseV1>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.healthCheckV1(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.healthCheckV1WithHttpInfo(rsp)));
            }));
    }

    /**
     * Health Check API
     */
    public healthCheckV1(_options?: ConfigurationOptions): Observable<HealthCheckResponseV1> {
        return this.healthCheckV1WithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<HealthCheckResponseV1>) => apiResponse.data));
    }

}
