# .HealthCheckApi

All URIs are relative to *http://localhost:8090/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**healthCheckV1**](HealthCheckApi.md#healthCheckV1) | **GET** /v1/health-check | Health Check API


# **healthCheckV1**
> HealthCheckResponseV1 healthCheckV1()


### Example


```typescript
import { createConfiguration, HealthCheckApi } from '';

const configuration = createConfiguration();
const apiInstance = new HealthCheckApi(configuration);

const request = {};

const data = await apiInstance.healthCheckV1(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**HealthCheckResponseV1**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful operation |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


