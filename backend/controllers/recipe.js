const Recipe = require("../db").Recipe;
const Ingredient = require("../db").Ingredient;
const Image = require("../db").Image;

const bot = require("../bot/bot").bot;
const botImage = require("../bot/bot").botImage;

require("dotenv").config({ path: ".env.local", override: true });

const profilBot = "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la preparation de la recette";
const questionBot = "sans les ingrediens je veux juste la preparation de";
const profilBotIngedient ="Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la liste des ingredients de la recette avec les quantités";


async function getRecipeVerif(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const question = req.body.question;

    const recipe = await Recipe.findOne({ where: { name: question } });
    if (!recipe) {
      await getRecipe(req, res); // si le nom existe pas on le creer
    }
    else {
      await getRecipeExist(req, res); // le nom existe on recupere les infos en BDD
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getRecipeExist(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const question = req.body.question;

    const recipe = await Recipe.findOne({ where: { name: question } });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const ingredients = await Ingredient.findAll({ where: { recipe_id: recipe.id } });
    if (!ingredients) {
      return res.status(404).json({ error: "ingredients not found" });
    }

    const image = await Image.findOne({ where: { recipe_id: recipe.id } });
    if (!ingredients) {
      return res.status(404).json({ error: "image not found" });
    }
    const ingredientNames = ingredients.map(ingredient => ingredient.name);

    res.status(200).json({
      name: question,
      recipe: recipe.description,
      ingredients: ingredientNames,
      image: image.src
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
   

async function getRecipe(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const question = req.body.question;
    const objPreparation = await getPreparation(req, res);
    recipeId = objPreparation.recipeId;
    const ingredients = await getIngredient(req, res, recipeId);
    const image =  await getImage(req, res, recipeId);;

    res.status(200).json({
      name: question,
      preparation: objPreparation.preparation,
      ingredients: ingredients,
      image: image,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPreparation(req, res) { //stockage en bdd
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    
    const question = req.body.question;
    const preparation = await bot(profilBot,questionBot + " " + question);
    // const preparation =
    //   "Pour préparer des crêpes au sucre, voici les étapes de la recette :\n\n1. Dans un grand bol, mélangez 250 g de farine avec 4 œufs. \n2. Ajoutez petit à petit 500 ml de lait tout en continuant de mélanger. Assurez-vous d'obtenir une pâte lisse et sans grumeaux.\n3. Ajoutez ensuite 50 g de beurre fondu et 1 pincée de sel dans la pâte. Mélangez bien.\n4. Laissez reposer la pâte pendant environ 30 minutes à température ambiante. Pendant ce temps, vous pouvez préchauffer une poêle à crêpes à feu moyen.\n5. Une fois la pâte reposée, versez une petite louche de pâte dans la poêle chaude. Inclinez la poêle pour répartir la pâte uniformément.\n6. Laissez cuire la crêpe pendant environ 2 minutes, jusqu'à ce qu'elle soit dorée en dessous. Puis, retournez-la avec une spatule et faites cuire l'autre côté pendant encore 1 à 2 minutes.\n7. Répétez les étapes 5 et 6 avec le reste de la pâte jusqu'à ce qu'il n'en reste plus.\n8. Une fois toutes les crêpes cuites, saupoudrez généreusement du sucre en poudre sur chaque crêpe encore chaude.\n9. Vous pouvez plier les crêpes en triangle ou en rouleau avant de les servir.\n10. Servez chaud et dégustez vos délicieuses crêpes au sucre !\n\nN'oubliez pas de garnir vos crêpes avec des fruits, du chocolat ou tout autre accompagnement de votre choix pour une touche personnelle et gourmande.";

    const recipe = await Recipe.create({
      name: question,
      description: preparation,
    });


    return { preparation: preparation, recipeId: recipe.id };
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Failed to create recipe." });
  }
}

async function getIngredient(req, res, recipeId) { //stockge en bdd
    try {
      if (!req.body?.question) {
        return res.status(400).json({ error: "Missing parameters" });
      }
      const question = req.body.question;
      const ingredients = await bot(profilBotIngedient, question);
    //   const ingredients =
    //     "Pour réaliser des crêpes au sucre, vous aurez besoin des ingrédients suivants :\n\n- 250g de farine\n- 4 œufs\n- 500ml de lait\n- 50g de beurre fondu\n- 1 pincée de sel\n- Du sucre en poudre\n\nVoilà, avec ces ingrédients vous pourrez préparer de délicieuses crêpes au sucre !";
  
      const ingredientsArray = ingredients.split("\n- ");
      ingredientsArray.shift();
      const cleanedIngredientsArray = ingredientsArray.map((ingredient) => {
        return ingredient.split("\n\n")[0];
      });
  
      console.log(cleanedIngredientsArray);
  
      for (const element of cleanedIngredientsArray) {
        const favoris = await Ingredient.create({
          name: element,
          recipe_id: recipeId,
        });
      }

      return cleanedIngredientsArray
  
    } catch (error) {
      console.error("Error creating ingredient", error);
      res.status(500).json({ error: "Failed to create ingredient." });
    }
  }

  async function getImage(req, res, recipeId) { //stockage en bdd
    try {
      if (!req.body?.question || !req.body?.id) {
        return res.status(400).json({ error: "Missing parameters" });
      }
      const question = req.body.question;
        const image =  await botImage(question, "256x256");  
       // const image = "image";
       
        const imageURL = await Image.create({
           name : question,
           src : image,
           recipe_id : recipeId
          });
  
      return image
  
    } catch (error) {
      console.error("Error creating image:", error);
      res.status(500).json({ error: "Failed to create image." });
    }
  }

module.exports = { getRecipeVerif };
