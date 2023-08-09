using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;


namespace recipesApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            // Enable attribute routing
            config.MapHttpAttributeRoutes();

            // Default API route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Additional routes for UserController
            config.Routes.MapHttpRoute(
                name: "UserApi",
                routeTemplate: "api/user/{action}/{id}",
                defaults: new { controller = "UserController", id = RouteParameter.Optional }
            );

            // Additional routes for RecipeController
            config.Routes.MapHttpRoute(
                name: "RecipeApi",
                routeTemplate: "api/recipe/{action}/{id}",
                defaults: new { controller = "RecipeController", id = RouteParameter.Optional }
            );

            // Other configuration code...

        }
    }
}
