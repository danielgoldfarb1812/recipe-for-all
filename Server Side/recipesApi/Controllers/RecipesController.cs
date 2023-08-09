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
    public class RecipesController : ApiController
    {
        private RecipeRepository _recipeRepository;

        public RecipesController()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;
            _recipeRepository = new RecipeRepository(connectionString);
        }

        //ניתוב ל-repository
        //אשר מבצע פעולה על הדאטאבייס בהתאם לניתוב שהוזן

        // GET api/recipes
        public IHttpActionResult Get()
        {
            List<Recipe> recipes = _recipeRepository.GetAllRecipes();
            return Ok(recipes);
        }

        // GET api/recipes/{id}
        public IHttpActionResult Get(int id)
        {
            Recipe recipe = _recipeRepository.GetRecipeById(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }
        // GET api/recipes/last-four
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/recipes/last-four")]
        public IHttpActionResult GetLastFourRecipes()
        {
            List<Recipe> recipes = _recipeRepository.GetLastFourRecipes(); // Implement this method in your RecipeRepository
            return Ok(recipes);
        }

        // POST api/recipes
        public IHttpActionResult Post([FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _recipeRepository.AddRecipe(recipe);

            return CreatedAtRoute("DefaultApi", new { id = recipe.Id }, recipe);
        }

        // PUT api/recipes/{id}
        public IHttpActionResult Put(int id, [FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _recipeRepository.UpdateRecipe(recipe);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/recipes/{id}
        public IHttpActionResult Delete(int id)
        {
            Recipe recipe = _recipeRepository.GetRecipeById(id);

            if (recipe == null)
            {
                return NotFound();
            }

            _recipeRepository.DeleteRecipe(id);

            return Ok(recipe);
        }
    }
}
