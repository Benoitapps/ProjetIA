const {mapFinderOptions} = require("sequelize/lib/utils");
const { User, Ingredient, Recipe } = require("../db");
const {getConnectedUser} = require("../services/userToken");

const bot = require("../bot/bot").bot;

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

     ingredients.forEach(element => {
        tabIngredients.push(element.name);
     });


    console.log(ingredients[0].name);
    console.log("ingredients", ingredients[0].name);
    res.status(200).json({
        name: recipe.name,
        description: recipe.description,
        ingredients: tabIngredients,
        preparation: recipe.preparation,
        image: recipe.src

    })

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
                  }
              ]
          }
      `;


      const answer = await bot(contextBot, question);
      var jsonResult = extraireJSON(answer);
      const answerJsonObject = JSON.parse(jsonResult);

      res.status(200).json(answerJsonObject);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

function extraireJSON(texte) {
  var debutJSON = texte.indexOf('{');
  var finJSON = texte.lastIndexOf('}');
  
  if (debutJSON !== -1 && finJSON !== -1) {
    var jsonResult = texte.slice(debutJSON, finJSON + 1);
    return jsonResult;
  } else {
    console.log("Aucun JSON trouvé dans le texte.");
    return null;
  }
}

module.exports = { getRecipeVerif, getShoppingList };
