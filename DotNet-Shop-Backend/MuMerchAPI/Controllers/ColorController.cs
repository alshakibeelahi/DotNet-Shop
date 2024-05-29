using BLL.DTOs;
using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MuMerchAPI.Controllers
{
        [EnableCors("*", "*", "*")]
        public class ColorController : ApiController
        {
            [HttpGet]
            [Route("api/color/all")]
            public HttpResponseMessage AllColor()
            {
                try
                {
                    var data = ColorService.GetAll();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                }
            }
            [HttpGet]
            [Route("api/color/{id}")]
            public HttpResponseMessage Color(int id)
            {
                try
                {
                    var data = ColorService.Get(id);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
            }
            [HttpPost]
            [Route("api/color/add")]
            public HttpResponseMessage Add(ColorDTO colorDTO)
            {
                try
                {
                    var data = ColorService.Add(colorDTO);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
            }
            [HttpPost]
            [Route("api/color/edit")]
            public HttpResponseMessage Edit(ColorDTO colorDTO)
            {
                try
                {
                    var data = ColorService.Edit(colorDTO);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
            }
            [HttpPost]
            [Route("api/color/delete")]
            public HttpResponseMessage Delete(ColorDTO dto)
            {
                try
                {
                    var data = ColorService.Delete(dto);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
            }
        }
 }
