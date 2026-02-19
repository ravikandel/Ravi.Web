using Microsoft.Data.SqlClient;
using Ravi.Web.Repositories.DbConnection;

namespace Ravi.Web.Repositories.HealthCheck;

public class DbHealthResult
{
    public bool Success { get; set; }
    public string? Server { get; set; }
    public string? Database { get; set; }
    public Exception? Exception { get; set; }
}

public interface IHealthCheckRepository
{
    DbHealthResult CheckDatabaseHealth();
}

public class HealthCheckRepository(IDbConnectionFactory connectionFactory) : IHealthCheckRepository
{
    private readonly IDbConnectionFactory _connectionFactory = connectionFactory;

    public DbHealthResult CheckDatabaseHealth()
    {
        var result = new DbHealthResult();

        try
        {
            using var connection = _connectionFactory.CreateConnection();

            if (connection is SqlConnection sqlConnection)
                result.Server = sqlConnection.DataSource;

            result.Database = connection.Database;
            connection.Open();

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";

            var scalar = command.ExecuteScalar();

            result.Success = scalar != null && Convert.ToInt32(scalar) == 1;
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Exception = ex;
        }

        return result;
    }
}