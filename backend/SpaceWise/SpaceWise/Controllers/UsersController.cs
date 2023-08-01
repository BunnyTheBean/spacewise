using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using SpaceWise.Database;
using SpaceWise.Models;

namespace SpaceWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SpaceWiseDbContext _context;

        public UsersController(SpaceWiseDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Route("notes/{userId}")]
        [HttpGet]
        public async Task<ActionResult<string>> GetNotesForUserId(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return (user.Notes ?? "").ToJson();
        }

        // PUT: api/users/notes
        // user in json body
        [Route("notes")]
        [HttpPut]
        public async Task<IActionResult> UpdateNotesForUserId(User incomingUser)
        {
            if (incomingUser == null || incomingUser.Notes == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(incomingUser.Id);
            if (user == null)
            {
                return NotFound();
            }

            user.Notes = incomingUser.Notes;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'SpaceWiseDbContext.Users'  is null.");
            }

            if (UsernameTaken(user.Username!))
            {
                return Conflict("Username already exists.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // POST: api/Users/login
        // No actual login or authorization functionality other than checking if the password matches.
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'SpaceWiseDbContext.Users'  is null.");
            }

            var allUsers = await _context.Users.ToListAsync();
            var matchingUser = allUsers
                .Where(x => user.Username == x.Username)
                .Where(x => user.Password == x.Password)
                .FirstOrDefault();
            
            if (matchingUser == null) 
            {
                return Unauthorized();
            }

            matchingUser.Password = "";
            return matchingUser;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private bool UsernameTaken(string username)
        {
            bool usernameExists = _context.Users.Any(x => x.Username == username);
            return usernameExists;
        }
    }
}
