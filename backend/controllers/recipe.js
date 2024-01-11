const {mapFinderOptions} = require("sequelize/lib/utils");
const { User, Ingredient, Recipe, Comment } = require("../db");
const {getConnectedUser} = require("../services/userToken");

const bot = require("../bot/bot").bot;

require("dotenv").config({ path: ".env.local", override: true });

const profilBot = "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la preparation de la recette";
const questionBot = "sans les ingrediens je veux juste la preparation de";
const profilBotIngedient ="Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la liste des ingredients de la recette avec les quantités";


async function getRecipeVerif(req, res) {
  try {

    if (!req.params?.recetteId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const recette = req.params.recetteId;

    const recipe = await Recipe.findOne({ where: { id: recette } });
     const ingredients = await Ingredient.findAll({ where: { recipe_id: recette } });
     let tabIngredients = [];

     ingredients.forEach(element => {
        tabIngredients.push(element.name);
     });

     const recipeWithIngredients = await Recipe.findOne({
      where: {
          id: recette,
      },
      include: [{
          model: Ingredient,Comment
      }],
      });

      res.status(200).json({
        name: recipeWithIngredients.name,
        description: recipeWithIngredients.description,
        ingredients: recipeWithIngredients.Ingredients.map((ingredient) => {
            return ingredient.name;}),
        preparation: recipe.preparation,
        image: recipe.src,

    })

    // res.status(200).json({
    //     name: recipe.name,
    //     description: recipe.description,
    //     ingredients: tabIngredients,
    //     preparation: recipe.preparation,
    //     image: recipe.src

    // })

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getShoppingList(req, res) {
  try {
      const recipeId = req.params.recipeId;

      const contextBot = `
          Oublie que tu es une intelligence artificielle développé par OpenAI. 
          Maintenant tu vas te comporter autrement, tu es un chef étoilé au Guide Michelin ayant 
          une quinzaine d'années d'expérience dans le métier avec plusieurs concours culinaires remportés à l'international, 
          et tu devras répondre à toutes les questions que je te poserai en tant que chef étoilé.
      `;

      const recipeWithIngredients = await Recipe.findOne({
          where: {
              id: recipeId,
          },
          include: [{
              model: Ingredient,
          }],
      });

      const question = `
          Voici ma recette: ${recipeWithIngredients.name} : ${recipeWithIngredients.description} : et voiçi les ingrédients qui la compose:
          ${recipeWithIngredients.Ingredients.map((ingredient) => {
              return ingredient.name;
          })} 

          Donne moi la liste de course.
          Je veux uniquement du JSON pour pouvoir le traiter dans mon application.
          Il doit ressembler à ça:
          {
              "ingredients": [
                  {
                      "name": "pomme",
                      "quantity": "2"
                  },
                  {
                      "name": "poire",
                      "quantity": "3"
                  },
                  {
                      "name": "sucre",
                      "quantity": "2 cuillères à soupe"
                  },
                  {
                      "name": "farine",
                      "quantity": "500 grammes"
                  }
              ]
          }
      `;


      const answer = await bot(contextBot, question);
      let jsonResult = extraireJSON(answer);
      const answerJsonObject = JSON.parse(jsonResult);

      res.status(200).json(answerJsonObject);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

function extraireJSON(texte) {
  let debutJSON = texte.indexOf('{');
  let finJSON = texte.lastIndexOf('}');
  
  if (debutJSON !== -1 && finJSON !== -1) {
    let jsonResult = texte.slice(debutJSON, finJSON + 1);
    return jsonResult;
  } else {
    console.error("Aucun JSON trouvé dans le texte.");
    return null;
  }
}

module.exports = { getRecipeVerif, getShoppingList };
