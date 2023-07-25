using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace SpaceWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {

        [HttpPost]
        public ActionResult<string> PostImage()
        {
            var file = Request.Form.Files[0];
            var extension = Path.GetExtension(file.FileName);
            var folderName = Path.Combine("wwwroot", "Images");
            var fileName = Guid.NewGuid().ToString() + extension;
            var fullPath = Path.Combine(folderName, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return fileName.ToJson();
        }
    }
}
