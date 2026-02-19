using Microsoft.OpenApi.Models;

namespace Ravi.WebHost.Configuration;

public static class SwaggerConfiguration
{
    /// <summary>
    /// Adds Swagger with JWT Bearer authentication (no versioning).
    /// </summary>
    public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            // JWT Bearer auth in Swagger
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                In = ParameterLocation.Header,
                Description = "Enter JWT token with Bearer prefix. Example: 'Bearer eyJhbGciOi...'"
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "Bearer",
                        Name = "Bearer",
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            });

            // Register a single Swagger doc (default versioning)
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Ravi WebHost API",
                Version = "v1",
                Description = "API documentation for Ravi WebHost."
            });
        });

        return services;
    }

    /// <summary>
    /// Configures Swagger UI (no versioning).
    /// </summary>
    public static WebApplication UseSwaggerWithJwt(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ravi WebHost API");
            c.RoutePrefix = string.Empty; // Optional: serve at root
        });
        return app;
    }
}

