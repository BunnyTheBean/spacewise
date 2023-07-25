﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using SpaceWise.Database;
using SpaceWise.Models;

namespace SpaceWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogpostsController : ControllerBase
    {
        private readonly SpaceWiseDbContext _context;

        public BlogpostsController(SpaceWiseDbContext context)
        {
            _context = context;
        }

        // GET: api/Blogposts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blogpost>>> GetBlogposts()
        {
          if (_context.Blogposts == null)
          {
              return NotFound();
          }
            //return await _context.Blogposts.ToListAsync();
            var blogposts = await _context.Blogposts.Include(x => x.Sections).Include(x => x.User).ToListAsync();
            blogposts.ForEach(x =>
            {
                x.User!.Password = string.Empty;
            });
            return Ok(blogposts);
        }

        // GET: api/Blogposts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blogpost>> GetBlogpost(int id)
        {
            if (_context.Blogposts == null)
            {
                return NotFound();
            }

            var blogpost = await _context.Blogposts
                .Include(x => x.Sections)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (blogpost == null)
            {
                return NotFound();
            }

            blogpost.User!.Password = string.Empty;
            return blogpost;
        }

        // PUT: api/Blogposts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogpost(int id, Blogpost blogpost)
        {
            // TODO: make this work, it doesnt yet work
            if (id != blogpost.Id)
            {
                return BadRequest();
            }

            var matchingUser = await _context.Users.FindAsync(blogpost.User!.Id);
            if (matchingUser == null)
            {
                return BadRequest("Blogpost references non-existing user.");
            }

            var matchingBlogpost = await _context.Blogposts.FindAsync(blogpost.Id);
            if (matchingBlogpost == null) 
            {
                return NotFound();
            }

            if (matchingBlogpost.User!.Id != matchingUser.Id)
            {
                return BadRequest("Blogpost references wrong user.");
            }

            blogpost.User = matchingUser;

            _context.Entry(blogpost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogpostExists(id))
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

        // POST: api/Blogposts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blogpost>> PostBlogpost(Blogpost blogpost)
        {
            if (_context.Blogposts == null)
            {
                return Problem("Entity set 'SpaceWiseDbContext.Blogposts'  is null.");
            }

            var matchingUser = await _context.Users.FindAsync(blogpost.User!.Id);

            if (matchingUser == null)
            {
                return BadRequest("Blogpost references non-existing user.");
            }

            blogpost.User = matchingUser;

            _context.Blogposts.Add(blogpost);
            await _context.SaveChangesAsync();

            blogpost.User.Username = string.Empty;
            blogpost.User.Password = string.Empty;

            return CreatedAtAction("GetBlogpost", new { id = blogpost.Id }, blogpost);
        }

        // DELETE: api/Blogposts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogpost(int id)
        {
            if (_context.Blogposts == null)
            {
                return NotFound();
            }
            var blogpost = await _context.Blogposts.FindAsync(id);
            if (blogpost == null)
            {
                return NotFound();
            }

            _context.Blogposts.Remove(blogpost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogpostExists(int id)
        {
            return (_context.Blogposts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
