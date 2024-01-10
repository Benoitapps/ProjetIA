const { getConnectedUser } = require("../services/userToken");
const {Sequelize} = require("sequelize");
const Recipe = require("../db").Recipe;
const Image = require("../db").Image;
const FoodPreference = require("../db").FoodPreference;
const Ingredient = require("../db").Ingredient;
const bot = require("../bot/bot").bot;
const { getUserPreferenceFormatted } = require("../services/getUserPreferenceFormatted");



async function getRecomendation(req, res) {

    console.log("recomendationnnnnnnn");

    try {
        if (!req.params?.recipeId) {
            return res.status(400).json({ error: "Paramètres manquants" });
        }
        const recipeId = req.params.recipeId;
        console.log("connecter :", recipeId);
        //la recette selectionner
        let  myRecipe = await Recipe.findOne({ where: { id: recipeId } });
        console.log("myrecipe.name", myRecipe.name);


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
        // console.log("recipesWithIngredients", recipesWithIngredients);

        const tabRecipe = recipesWithIngredients.map((item) => `id:${item.id} nom:${item.name} lien:${item.src} Ingredients:${item.Ingredients.map(ing => ing.name).join(', ')}`).join(', ');
        // console.log("tabRecipe", tabRecipe);
        
        const userPreferenceFormatted = await getUserPreferenceFormatted(req.cookies.token);


        profilBot = `Voici les recettes ainsi que leurs id qui sont issues de ma base de données.
        Les données sont écrite de cette facon identifiant:nom_de_la_recette.
        voici les recettes de ma base de données:  ${tabRecipe}
        J'aimerais que pour cette recette: ${myRecipe.name}, tu me donnes uniquement quatre recettes qui se rapproche le plus possible en fonction des ingrédients qui la compose et qui sont forcement parmis les rectte données.
        
        ${userPreferenceFormatted}

        Si il y a moins de quatre recettes similaire tiré de ma base de données, tu m'ajouteras le nombre nécessaire de recette pour en avoir quatre au total. 
        retournes UNIQUEMENT et seulement un objet JSON et pas d'autres textes, le JSON aura cette forme :
        [{"id": 11,"recette": "crepe au chocolat","src":"liens"},{"id": 17,"recette": "Pain au chocolat","src":"liens"},{"id": 14,"recette": "gateau a la fraise","src":"liens"},{"id": 16,"recette": "crepe au sucre","src":"liens"}]`;


    
          
       

        console.log("profilBot", profilBot);   

    
         let answer = await getAnswer(tabRecipe, myRecipe, profilBot);
        console.log("answer", answer);
         //trransformation de la reponse de l'IA en JSON
        const debutIndice = answer.indexOf('[');
        const finIndice = answer.lastIndexOf(']');
        const answer2 = answer.substring(debutIndice, finIndice + 1);
        const answerJson = JSON.parse(answer2);

        const recipe = await Recipe.findAll();

        res.status(200).json({
            answer: answerJson,
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
