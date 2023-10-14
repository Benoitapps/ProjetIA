const connection = require("./db");
const fs = require("fs");
const path = require("path");

const db = {connection};
 
// Cela récupère la liste des fichiers présents dans le répertoire models en utilisant 
// fs.readdirSync. __dirname est une variable qui représente le chemin absolu du répertoire du fichier en cours.
const files = fs.readdirSync(path.join(__dirname, "models")); 

files.forEach((file) => {
  const model = require(path.join(__dirname, "models", file))(connection);

  db[model.name] = model;

});

const User = db.User;
const Comment = db.Comment;
const Recipe = db.Recipe;
const Ingredient = db.Ingredient;
const Image = db.Image;
const FoodPreference = db.FoodPreference;
const Favoris = db.Favoris;

User.hasMany(FoodPreference, 
  {foreignKey: 'user_id', alias : "users_foods" });

User.hasMany(Favoris, 
  {foreignKey: 'user_id', alias : "users_favoris" });

User.hasMany(Comment, 
  {foreignKey: 'user_id', alias : "users_comments" });


Recipe.hasMany(Favoris,
  {foreignKey: 'recipe_id', alias : "recipes_favoris" });
  
Recipe.hasMany(Comment, 
  {foreignKey: 'recipe_id', alias : "recipes_comments" });

Recipe.hasMany(Ingredient, 
  {foreignKey: 'recipe_id', alias : "recipes_ingredients" });

Recipe.hasMany(Image, 
  {foreignKey: 'recipe_id', alias : "recipes_images" });


module.exports = db;
