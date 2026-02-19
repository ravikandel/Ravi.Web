using System.Text.Json;
using System.Text.Json.Serialization;

namespace Ravi.WebHost.Configuration;
public static class EnvironmentSettings
{
    public static string GetEnvironment()
    {
        var currentDirectoryPath = AppContext.BaseDirectory;
        var envSettingsPath = Path.Combine(currentDirectoryPath, "envsettings.json");

        if (!File.Exists(envSettingsPath))
        {
            Console.WriteLine("envsettings.json not found, using Development environment");
            return "Development";
        }

        try
        {
            var jsonContent = File.ReadAllText(envSettingsPath);
            var envSettings = JsonSerializer.Deserialize<EnvSettings>(jsonContent);
            var environmentValue = envSettings?.Environment;

            if (string.IsNullOrEmpty(environmentValue))
            {
                environmentValue = "Development";
            }

            Console.WriteLine($"Using environment: {environmentValue}");
            return environmentValue;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading envsettings.json: {ex.Message}");
            return "Development";
        }
    }

    private class EnvSettings
    {
        [JsonPropertyName("ASPNETCORE_ENVIRONMENT")]
        public string Environment { get; set; } = string.Empty;
    }
}