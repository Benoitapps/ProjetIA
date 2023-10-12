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





module.exports = db;
