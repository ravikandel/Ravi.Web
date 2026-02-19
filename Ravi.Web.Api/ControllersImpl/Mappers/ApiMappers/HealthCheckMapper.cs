using Microsoft.AspNetCore.Mvc.Internal;
using Ravi.Web.ServiceModel.HealthCheck;
using ApiModels = Ravi.Web.Api.Models;

namespace Ravi.Web.Api.ControllersImpl.Mappers.ApiMappers;

public static class HealthCheckMapper
{
    public static ApiModels.HealthCheckResponseV1 ToApiModel(this HealthCheckResponse source)
    {        
        return new ApiModels.HealthCheckResponseV1
        {
            Server = source.Server,
            Database = source.Database,
            Status = source.Status.ToApiEnum(),
            Description = source.Description,
            Exception = source.Exception,
            Timestamp = source.Timestamp
        };
    }
    
    public static ApiModels.HealthStatusEnumV1 ToApiEnum(this HealthStatusEnum source)
    {
        return source switch
        {
            HealthStatusEnum.Healthy => ApiModels.HealthStatusEnumV1.Healthy,
            HealthStatusEnum.Unhealthy => ApiModels.HealthStatusEnumV1.Unhealthy,
            HealthStatusEnum.Degraded => ApiModels.HealthStatusEnumV1.Degraded,
            _ => throw new ArgumentOutOfRangeException(nameof(source), $"Not expected health status value: {source}")
        };
    }
   


}