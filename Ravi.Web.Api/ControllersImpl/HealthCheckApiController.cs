using Microsoft.AspNetCore.Mvc;
using Ravi.Web.Api.ControllersImpl.Mappers.ApiMappers;
using Ravi.Web.Services.HealthCheck;

namespace Ravi.Web.Api.ControllersImpl;

public class HealthCheckApiController(IHealthCheckService healthCheckService) : Controllers.HealthCheckApiController
{
    public override async Task<IActionResult> HealthCheckV1()
    {
        var result = await healthCheckService.CheckHealthAsync();
        return Ok(result.ToApiModel());
    }
}