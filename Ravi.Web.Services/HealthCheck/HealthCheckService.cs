using Ravi.Web.Repositories.HealthCheck;
using Ravi.Web.ServiceModel.HealthCheck;

namespace Ravi.Web.Services.HealthCheck;


public interface IHealthCheckService
{
    Task<HealthCheckResponse> CheckHealthAsync();
}


public class HealthCheckService(IHealthCheckRepository healthCheckRepository) : IHealthCheckService
{
    public async Task<HealthCheckResponse> CheckHealthAsync()
    {
        var dbResult = await healthCheckRepository.CheckDatabaseHealthAsync();

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
