﻿using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MuMerchAPI.Auth
{
    public class AdminAccess : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var token = actionContext.Request.Headers.Authorization;
            if (token == null)
            {
                actionContext.Response =
                    actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized, new { Msg = "No token supplied" });
            }
            else if (!AuthService.IsAdmin(token.ToString()))
            {
                actionContext.Response =
                    actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized, new { Msg = "Supplied token is invalid or expired" });
            }
            base.OnAuthorization(actionContext);
        }
    }
}