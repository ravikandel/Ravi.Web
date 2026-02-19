using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ravi.Web.Api.Models;

namespace Ravi.Web.Api.Controllers
{ 
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    public abstract class HealthCheckApiController : ControllerBase
    { 
        /// <summary>
        /// Health Check API
        /// </summary>
        /// <response code="200">Successful operation</response>
        [HttpGet]
        [Route("~/api/v1/health-check")]
        public abstract Task<HealthCheckResponseV1> HealthCheckV1();
    }
}