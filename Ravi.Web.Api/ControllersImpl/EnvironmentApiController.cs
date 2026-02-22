using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Ravi.Web.Api.ControllersImpl
{
    public class EnvironmentApiController : Controllers.EnvironmentApiController
    {
        public override async Task<IActionResult> GetEnvironment()
        {
            var result = EnvironmentSettings.GetEnvironment();
            await Task.CompletedTask; // Simulate async operation
            return Ok(result);
        }
    }
}