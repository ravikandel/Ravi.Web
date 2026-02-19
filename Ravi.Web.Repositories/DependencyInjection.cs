using Microsoft.Extensions.DependencyInjection;

namespace Ravi.Web.Repositories;
public static class DependencyInjection
{
    public static void AddRepositories(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;
        var types = assembly
            .GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Repository"));

        foreach (var type in types)
        {
            var interfaceType = type.GetInterface($"I{type.Name}");
            if (interfaceType != null)
            {
                services.AddScoped(interfaceType, type);
            }
        }
    }
}