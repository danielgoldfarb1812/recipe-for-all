using recipesApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace recipesApi.Controllers
{
    public class UsersController : ApiController
    {
        private UserRepository _userRepository;

        public UsersController()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;
            _userRepository = new UserRepository(connectionString);
        }

        // GET api/user
        public IHttpActionResult Get()
        {
            List<User> users = _userRepository.GetAllUsers();
            return Ok(users);
        }

        // GET api/user/{id}
        public IHttpActionResult Get(int id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/user
        public IHttpActionResult Post([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _userRepository.AddUser(user);

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // PUT api/user/{id}
        public IHttpActionResult Put(int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.UpdateUser(user);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/user/{id}
        public IHttpActionResult Delete(int id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            _userRepository.DeleteUser(id);

            return Ok(user);
        }
    }
}