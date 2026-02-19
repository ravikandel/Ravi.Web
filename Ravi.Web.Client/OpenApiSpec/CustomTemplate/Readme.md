### TokenProvider`1.mustache & RateLimitProvider`.mustache
GetAsync function made public from internal

### modelGeneric.mustache
Added parameterless constructor, this includes setting the discriminator property based on the type

### JsonConverter.mustache
HardCoded the datetime deserilizer to DateTimeOffset to avoid issues with timezone conversion. Also fixed a new line issue.

```
{{#lambda.camelcase_sanitize_param}}{{name}}{{/lambda.camelcase_sanitize_param}} = {{>OptionProperty}}JsonSerializer.Deserialize<DateTimeOffset{{#isNullable}}?{{/isNullable}}>(ref utf8JsonReader, jsonSerializerOptions));
```