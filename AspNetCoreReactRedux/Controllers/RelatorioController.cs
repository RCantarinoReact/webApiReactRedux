using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class RelatorioController : Controller
    {
        private readonly IContactService _contactService;

        public RelatorioController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        [Route("Contatos")]
        public async Task<IActionResult> Contacts()
        {
            return Ok(await _contactService.GetContacts());
        }
    }
}