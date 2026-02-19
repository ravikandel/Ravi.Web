using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Ravi.Web.Api.ControllersImpl.Mappers.ApiMappers;
using Ravi.Web.Api.Models;
using Ravi.Web.Services.HealthCheck;

namespace Ravi.Web.Api.ControllersImpl;

    public class HealthCheckApiController(IHealthCheckService healthCheckService) : Controllers.HealthCheckApiController
    {
        public override Task<HealthCheckResponseV1> HealthCheckV1()
        {
            var response = healthCheckService.CheckHealth();
            return Task.FromResult(response.ToApiModel());
        }
    }