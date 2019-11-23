using System;
using System.IO;
using System.Security.AccessControl;
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
            Random rnd = new Random();
            String filename = "image_" + rnd.Next(12, 2000).ToString() + ".png";
            string picPath = System.Web.HttpContext.Current.Server.MapPath(filename);
            using (FileStream fs = new FileStream(picPath, FileMode.Create))
            {
                using (BinaryWriter bw = new BinaryWriter(fs))
                {
                    byte[] data = Convert.FromBase64String(imageData);
                    bw.Write(data);
                    bw.Close();
                }
            }

            return Json(true);
        }

        private static void SaveTxtFile(string img)
        {
            using (System.IO.StreamWriter file =
                new System.IO.StreamWriter(System.Web.HttpContext.Current.Server.MapPath("~/file.txt")))
            {
                file.WriteLine(img);
            }
        }
    }
}