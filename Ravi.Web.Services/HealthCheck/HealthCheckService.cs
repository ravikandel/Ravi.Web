using Ravi.Web.Repositories.HealthCheck;
using Ravi.Web.ServiceModel.HealthCheck;

namespace Ravi.Web.Services.HealthCheck;

public interface IHealthCheckService
{
    HealthCheckResponse CheckHealth();
}

public class HealthCheckService(IHealthCheckRepository healthCheckRepository) : IHealthCheckService
{
    public HealthCheckResponse CheckHealth()
    {
        var dbResult = healthCheckRepository.CheckDatabaseHealth();

        var response = new HealthCheckResponse
        {
            Server = Environment.MachineName,
            Database = dbResult.Database ?? "Unknown",
            Status = dbResult.Success ? HealthStatusEnum.Healthy : HealthStatusEnum.Unhealthy,
            Description = "Db Checkup " + (dbResult.Success ? "success" : "fail"),
            Timestamp = DateTimeOffset.UtcNow,
            Exception = dbResult.Exception?.ToString()

        };

        return response;
    }
}
