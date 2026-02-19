using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ravi.Web.ServiceModel.HealthCheck
{
    public class HealthCheckResponse
    {
        public required string Server { get; set; }
        public required string Database { get; set; }
        public HealthStatusEnum Status { get; set; }
        public string? Description { get; set; }
        public string? Exception { get; set; }
        public DateTimeOffset Timestamp { get; set; }
    }

    public enum HealthStatusEnum
    {
        Healthy,
        Unhealthy,
        Degraded,
    }
}
