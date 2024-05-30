using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MuMerchAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS globally
            var cors = new EnableCorsAttribute("http://localhost:4000", "*", "*");
            config.EnableCors(cors);

            // Add the preflight request handler
            config.MessageHandlers.Add(new PreflightRequestsHandler());
            // Web API configuration and services

            //var json = config.Formatters.JsonFormatter;
            //json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
