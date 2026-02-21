using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using Ravi.WebHost;
using Ravi.WebHost.Configuration;
using Ravi.WebHost.Middlewares;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

try
{
    logger.Info("Starting Ravi WebHost ...");

    var builder = WebApplication.CreateBuilder(new WebApplicationOptions
    {
        EnvironmentName = EnvironmentSettings.GetEnvironment()
    });

    // ===== Nlog configuration =====
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Logging.AddConsole();
    builder.Host.UseNLog();

    // ===== Add services =====
    builder.Services.AddSingleton<IConfiguration>(_ => builder.Configuration);
    builder.Services.AddControllers();
    builder.Services.AddHttpContextAccessor();

    // ===== Dynamic DI services =====
    builder.Services.DependencyResolver();

    // ====Add CORS policy====
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", policyBuilder =>
        {
            policyBuilder.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [])
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    // Configure serialization options globally
    builder.Services.Configure<JsonOptions>(options =>
    {
        options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.SerializerOptions.AllowTrailingCommas = true;
    });

    // ===== JWT Authentication =====
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
            };
        });

    // ===== Authorization (using AddAuthorizationBuilder) =====

    builder.Services.AddAuthorizationBuilder()
    .AddPolicy("MyGiftApiPolicy", policy =>
        policy.RequireClaim("role")
              .RequireClaim("userId"));

    // ===== Swagger =====
    builder.Services.AddSwaggerWithJwt();


    // ====Setup App =====
    var app = builder.Build();

    // ===== HTTPS, Auth =====
    if (!app.Environment.IsDevelopment())
    {
        app.UseHsts();
    }

    // ===== Swagger UI (no versioning) =====
    app.UseSwaggerWithJwt();
    app.UseHttpsRedirection();

    // ===== Middleware =====
    app.UseRequestResponseLoggingMiddleware();
    app.UseExceptionHandlerMiddleware();

    app.UseCors("CorsPolicy");
    app.UseAuthentication();
    app.UseAuthorization();

    // ==== Add traceparent header to response ====
    app.Use(async (context, next) =>
    {
        var activity = System.Diagnostics.Activity.Current;
        if (activity != null)
        {
            // Use the strongly-typed TraceParent property if available
            context.Response.Headers.TraceParent = $"00-{activity.TraceId}-{activity.SpanId}-01";
        }
        await next();
    });

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Ravi WebHost failed to start.");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit
    LogManager.Shutdown();
}