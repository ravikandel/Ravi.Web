using System.Text;
using NLog;
using ILogger = NLog.ILogger;

namespace Ravi.WebHost.Middlewares;

public static class RequestResponseLoggingMiddlewareExtensions
{
    public static void UseRequestResponseLoggingMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<RequestResponseLoggingMiddleware>();
    }
}

public class RequestResponseLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

    public RequestResponseLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Only log requests under /api
        if (!context.Request.Path.StartsWithSegments("/api"))
        {
            await _next(context);
            return;
        }

        var traceId = System.Diagnostics.Activity.Current?.TraceId.ToString() ?? context.TraceIdentifier;

        // ----- Log Request -----
        context.Request.EnableBuffering();
        string requestBody = string.Empty;

        if (context.Request.ContentLength > 0 && context.Request.Body.CanRead)
        {
            using var reader = new StreamReader(
                context.Request.Body,
                Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                bufferSize: 1024,
                leaveOpen: true);
            requestBody = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;
        }

        Logger.Info(new NLog.LogEventInfo(NLog.LogLevel.Info, Logger.Name, "")
        {
            Properties =
                {
                    ["message"] = $"HTTP Request: {context.Request.Method} {context.Request.Path}",
                    ["Body"] = requestBody
                }
        });

        // ----- Capture Response -----
        var originalBodyStream = context.Response.Body;
        await using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;

        await _next(context);

        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var responseText = await new StreamReader(context.Response.Body).ReadToEndAsync();
        context.Response.Body.Seek(0, SeekOrigin.Begin);

        Logger.Info(new NLog.LogEventInfo(NLog.LogLevel.Info, Logger.Name, "")
        {
            Properties =
                {
                    ["message"] = $"HTTP Response: {context.Request.Method} {context.Request.Path}",
                    ["StatusCode"] = context.Response.StatusCode,
                    ["Body"] = responseText
                }
        });

        await responseBody.CopyToAsync(originalBodyStream);
    }
}

