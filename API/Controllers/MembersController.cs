using Microsoft.AspNetCore.Http;   
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.Data;

namespace API.Controllers
{
    [Route("api/[controller]")] // localhost:5001/api/members - this sets the base URL path for all endpoints in this controller
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await context.Users.ToListAsync();
            return members;
        }

        [HttpGet("{id}")] // localhost:5001/api/members/bob-id based on id
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);

            if (member == null) return NotFound();
            return member;
        }
    }
}
