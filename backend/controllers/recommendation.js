const { getConnectedUser } = require("../services/userToken");
const {Sequelize} = require("sequelize");
const Recipe = require("../db").Recipe;
const Image = require("../db").Image;
const FoodPreference = require("../db").FoodPreference;
const Ingredient = require("../db").Ingredient;
const bot = require("../bot/bot").bot;
const { getUserPreferenceFormatted } = require("../services/getUserPreferenceFormatted");



async function getRecomendation(req, res) {

    try {
        if (!req.params?.recipeId) {
            return res.status(400).json({ error: "Paramètres manquants" });
        }
        const recipeId = req.params.recipeId;
        //la recette selectionner
        let  myRecipe = await Recipe.findOne({ where: { id: recipeId } });


        // //toutes les recettes sauf celle selectionner
        async function getInge(recipeId) {
            try {
                // Récupérer toutes les recettes avec leurs ingrédients, en excluant celle avec recipeId
                const allRecipes = await Recipe.findAll({
                    include: [{
                        model: Ingredient,
                    }],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: recipeId
                        }
                    }
                });
        
                return allRecipes;
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
                return {
                    error: error.message
                };
            }
        }
        const recipesWithIngredients = await getInge(recipeId);

        const tabRecipe = recipesWithIngredients.map((item) => `id:${item.id} nom:${item.name} lien:${item.src} Ingredients:${item.Ingredients.map(ing => ing.name).join(', ')} Description:${item.description}`).join(', ');
        
        const userPreferenceFormatted = await getUserPreferenceFormatted(req.cookies.token);


        profilBot = `Voici les recettes ainsi que leurs id qui sont issues de ma base de données.
        Les données sont écrite de cette facon identifiant:nom_de_la_recette.
        voici les recettes de ma base de données:  ${tabRecipe}
        J'aimerais que pour cette recette: ${myRecipe.name}, tu me donnes uniquement quatre recettes qui se rapprochent le plus possible en fonction des ingrédients qui la compose et qui sont forcement parmis les recettes données,
        dans ces 4 recettes donne moi le plus de recettes possible dont les ingrédients soient de saison a cette date: ${new Date().toLocaleDateString()}).
        
        ${userPreferenceFormatted}

        Si il y a moins de quatre recettes similaire tiré de ma base de données, tu m'ajouteras le nombre nécessaire de recette pour en avoir quatre au total.
        retournes UNIQUEMENT et seulement un tableau d'id et pas d'autres textes sous cette forme :
        [1,2,3,4]`

        // [{"id": 11,"recette": "crepe au chocolat","src":"liens","description":"la description de la recette"},{"id": 17,"recette": "Pain au chocolat","src":"liens","description":"la description de la recette"},{"id": 14,"recette": "gateau a la fraise","src":"liens","description":"la description de la recette"},{"id": 16,"recette": "crepe au sucre","src":"liens","description":"la description de la recette"}]`;

    
    
         let answer = await getAnswer(tabRecipe, myRecipe, profilBot);

        const debutanswer = answer.indexOf('[');
        const finanswer = answer.lastIndexOf(']');
        const answerResult = answer.substring(debutanswer, finanswer + 1);
        const numberArray = JSON.parse(answerResult);


        let recipesRes = [];

        for (let i = 0; i < recipesWithIngredients.length; i++) {
            let found = false;
            for (let j = 0; j < numberArray.length; j++) {
               
              if (recipesWithIngredients[i].id === numberArray[j]) {
                found = true;
                break;
              }
            }
          
            if (found) {
              recipesRes.push({"id":recipesWithIngredients[i].id,"recette":recipesWithIngredients[i].name,"src":recipesWithIngredients[i].src});
            }
          }

        const recipe = await Recipe.findAll();

        res.status(200).json({
            answer: recipesRes,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRecomendation };

async function getAnswer(tabRecipe, myRecipe,profilBot) {

    try {
        if (!tabRecipe || !myRecipe || !profilBot) {
            return "missing parameters answer"
        }
        const question = myRecipe.name;
        const answer = await bot(profilBot, question);
        return answer;
    } catch (error) {
        return error.message;
    }
}
