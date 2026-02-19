These templates override the default aspnetcore template from the openapi-generator-cli in order to format
the controllers and models for use in a .Net Framework 4.8 API.
The cli should not be used to generate the project ( as it will be .net core), instead use the VS project template "
ASP.NET Web Application (.Net Framework)" and add controllers to this.

The main changes to the templates are:

* Fixes the usings to reference framework libs, not core
* Prepends a '~' to the routes as framework does not allow a route to start with '/' (cannot figure out how to remove it otherwise)
* Removes some Swagger attributes 
In path param use FromUri instead of From Route

Original Files found here:
https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources/aspnetcore/3.0