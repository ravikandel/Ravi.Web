using System.Net;
using System.Text.Json;

namespace Ravi.WebHost.Middlewares;
public static class ExceptionHandlerMiddlewareExtensions
{
    public static void UseExceptionHandlerMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionHandlerMiddleware>();
    }
}

public class ExceptionHandlerMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionMessageAsync(context, ex).ConfigureAwait(false);
        }
    }

    private static Task HandleExceptionMessageAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        const int statusCode = (int)HttpStatusCode.InternalServerError; ;
        var result = JsonSerializer.Serialize(new
        {
            StatusCode = statusCode,
            ErrorMessage = ex.Message,
            Details = ex.InnerException?.Message
        });
        context.Response.StatusCode = statusCode;
        return context.Response.WriteAsync(result);
    }
}