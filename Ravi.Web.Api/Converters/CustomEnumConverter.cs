using System.ComponentModel;
using Newtonsoft.Json;

namespace Ravi.Web.Api.Converters
{
    public class CustomEnumConverter<T> : TypeConverter
    {
        /// <summary>
        /// Determines whether this instance can convert from the specified source type.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</param>
        /// <param name="sourceType">The type to convert from.</param>
        /// <returns></returns>

        public override bool CanConvertFrom(ITypeDescriptorContext? context, Type sourceType)
        {
            return sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
        }

        /// <summary>
        /// Converts the given value to the type of this converter, using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</
        /// param name="culture">The CultureInfo to use as the current culture.</param>
        /// <param name="value">The object to convert.</param>
        /// <returns></returns>
        public override object? ConvertFrom(ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value)
        {
            var s = value as string;
            if (string.IsNullOrEmpty(s))
            {
                return null;
            }
            return JsonConvert.DeserializeObject<T>(@"""" + value + @"""");
        }
    }
}