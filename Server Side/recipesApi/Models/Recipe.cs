using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace recipesApi.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public int CreatedBy { get; set; }
        public string Image { get; set; } // Add the 'Image' property
    }

}