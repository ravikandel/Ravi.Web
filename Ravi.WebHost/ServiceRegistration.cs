using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Ravi.Web.Repositories;
using Ravi.Web.Services;
using Ravi.Web.Repositories.DbConnection;

namespace Ravi.WebHost;
public static class ServiceRegistration
{
    public static IServiceCollection DependencyResolver(this IServiceCollection services)
    {
        // Register DbConnectionFactory as a singleton
        services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

        // Register repositories and services using their respective extension methods
        services.AddServices();
        services.AddRepositories();

        return services;
    }
}