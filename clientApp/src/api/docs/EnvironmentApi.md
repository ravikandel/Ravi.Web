# .EnvironmentApi

All URIs are relative to *http://localhost:8090/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getEnvironment**](EnvironmentApi.md#getEnvironment) | **GET** /env | 


# **getEnvironment**
> string getEnvironment()


### Example


```typescript
import { createConfiguration, EnvironmentApi } from '';

const configuration = createConfiguration();
const apiInstance = new EnvironmentApi(configuration);

const request = {};

const data = await apiInstance.getEnvironment(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


