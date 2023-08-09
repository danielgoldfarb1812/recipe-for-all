using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace recipesApi.Models
{
    public class RecipeRepository
    {
        private string _connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;

        // קונסטרוקטור המקבל מחרוזת חיבור אל מסד הנתונים
        public RecipeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        // פונקציה המחזירה את רשימת כל המתכונים ממסד הנתונים
        public List<Recipe> GetAllRecipes()
        {
            List<Recipe> recipes = new List<Recipe>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM Recipes";
                SqlCommand command = new SqlCommand(query, connection);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Recipe recipe = new Recipe
                        {
                            // יצירת אובייקט מתכון ומילוי השדות מתוך התוצאה שהתקבלה מהשאילתה
                            Id = (int)reader["Id"],
                            Title = (string)reader["Title"],
                            Description = (string)reader["Description"],
                            Ingredients = (string)reader["Ingredients"],
                            Instructions = (string)reader["Instructions"],
                            CreatedBy = (int)reader["CreatedBy"],
                            Image = (string)reader["Image"] // Added line to retrieve image path
                        };

                        recipes.Add(recipe);
                    }
                }
            }

            return recipes;
        }

        // פונקציה המחזירה את ארבעת המתכונים האחרונים ממסד הנתונים
        public List<Recipe> GetLastFourRecipes()
        {
            List<Recipe> recipes = new List<Recipe>();
            string query = "SELECT TOP 4 * FROM Recipes ORDER BY Id DESC";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Recipe recipe = new Recipe
                            {
                                Id = (int)reader["Id"],
                                Title = (string)reader["Title"],
                                Description = (string)reader["Description"],
                                Ingredients = (string)reader["Ingredients"],
                                Instructions = (string)reader["Instructions"],
                                CreatedBy = (int)reader["CreatedBy"],
                                Image = (string)reader["Image"] // Added line to retrieve image path
                            };
                            recipes.Add(recipe);
                        }
                    }
                }
            }

            return recipes;
        }

        // פונקציה המחזירה מתכון לפי זיהוי
        public Recipe GetRecipeById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM Recipes WHERE Id = @Id";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        Recipe recipe = new Recipe
                        {
                            Id = (int)reader["Id"],
                            Title = (string)reader["Title"],
                            Description = (string)reader["Description"],
                            Ingredients = (string)reader["Ingredients"],
                            Instructions = (string)reader["Instructions"],
                            CreatedBy = (int)reader["CreatedBy"],
                            Image = (string)reader["Image"] // Added line to retrieve image path
                        };

                        return recipe;
                    }
                }
            }

            return null;
        }

        // פונקציה המוסיפה מתכון חדש למסד הנתונים
        public void AddRecipe(Recipe recipe)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "INSERT INTO Recipes (Title, Description, Ingredients, Instructions, CreatedBy, Image) " +
                               "VALUES (@Title, @Description, @Ingredients, @Instructions, @CreatedBy, @Image)";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Title", recipe.Title);
                command.Parameters.AddWithValue("@Description", recipe.Description);
                command.Parameters.AddWithValue("@Ingredients", recipe.Ingredients);
                command.Parameters.AddWithValue("@Instructions", recipe.Instructions);
                command.Parameters.AddWithValue("@CreatedBy", recipe.CreatedBy);
                command.Parameters.AddWithValue("@Image", recipe.Image); // Added line to insert image path

                command.ExecuteNonQuery();
            }
        }

        // פונקציה המעדכנת מתכון קיים במסד הנתונים
        public void UpdateRecipe(Recipe recipe)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "UPDATE Recipes " +
                               "SET Title = @Title, Description = @Description, Ingredients = @Ingredients, " +
                               "Instructions = @Instructions, CreatedBy = @CreatedBy, Image = @Image " +
                               "WHERE Id = @Id";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Title", recipe.Title);
                command.Parameters.AddWithValue("@Description", recipe.Description);
                command.Parameters.AddWithValue("@Ingredients", recipe.Ingredients);
                command.Parameters.AddWithValue("@Instructions", recipe.Instructions);
                command.Parameters.AddWithValue("@CreatedBy", recipe.CreatedBy);
                command.Parameters.AddWithValue("@Image", recipe.Image); // Added line to update image path
                command.Parameters.AddWithValue("@Id", recipe.Id);

                command.ExecuteNonQuery();
            }
        }

        public void DeleteRecipe(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "DELETE FROM Recipes WHERE Id = @Id";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);

                command.ExecuteNonQuery();
            }
        }
    }
}
