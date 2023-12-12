const {mapFinderOptions} = require("sequelize/lib/utils");
const Recipe = require("../db").Recipe;
const Ingredient = require("../db").Ingredient;
const Image = require("../db").Image;
const User = require("../db").User;
const {getConnectedUser} = require("../services/userToken");

const bot = require("../bot/bot").bot;
const botImage = require("../bot/bot").botImage;

require("dotenv").config({ path: ".env.local", override: true });

const profilBot = "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la preparation de la recette";
const questionBot = "sans les ingrediens je veux juste la preparation de";
const profilBotIngedient ="Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la liste des ingredients de la recette avec les quantités";


async function getRecipeVerif(req, res) {
  try {

    if (!req.params?.recetteId) {
      console.log(req.params)
      return res.status(400).json({ error: "Missing parameters" });
    }
      //   const token = req.cookies.token;
      //   console.log("token", token);
      //
      // const test = await getConnectedUser(token);
      //   console.log(test);

    const recette = req.params.recetteId;

    const recipe = await Recipe.findOne({ where: { id: recette } });
     const ingredients = await Ingredient.findAll({ where: { recipe_id: recette } });
     let tabIngredients = [];

     const image = await Image.findOne({ where: { recipe_id: recette } });

     ingredients.forEach(element => {
        tabIngredients.push(element.name);
     });


    console.log(ingredients[0].name);
    console.log("ingredients", ingredients[0].name);
    res.status(200).json({
        name: recipe.name,
        description: recipe.description,
        ingredients: tabIngredients,
        image: image.src

    })

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

module.exports = { getRecipeVerif };
