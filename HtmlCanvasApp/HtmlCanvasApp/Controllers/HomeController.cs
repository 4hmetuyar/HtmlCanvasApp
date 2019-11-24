using System;
using System.Drawing;
using System.IO;
using System.Web.Mvc;


namespace HtmlCanvasApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveImage(string imageData)
        {
            try
            {
                Random rnd = new Random();
                var filename = "/image_" + rnd.Next(12, 2000) + ".png";
                var picPath = System.Web.HttpContext.Current.Server.MapPath("/content");

                if (!Directory.Exists(picPath))
                {
                    Directory.CreateDirectory(picPath);
                }

                byte[] bytes = Convert.FromBase64String(imageData);
                Image image;
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    image = Image.FromStream(ms);
                }

                image.Save(picPath + filename, System.Drawing.Imaging.ImageFormat.Png);
                return Json(true);
            }
            catch (Exception e)
            {
                return Json(false);
            }
        }
    }
}