const { getConnectedUser } = require("../services/userToken");
const {Sequelize} = require("sequelize");
const Recipe = require("../db").Recipe;
const Image = require("../db").Image;
const FoodPreference = require("../db").FoodPreference;
const bot = require("../bot/bot").bot;

async function getRecomendation(req, res) {
    try {
        if (!req.params?.recipeId) {
            return res.status(400).json({ error: "Paramètres manquants" });
        }
        const recipeId = req.params.recipeId;

        let myRecipe;
        try {
            myRecipe = await Recipe.findOne({ where: { id: recipeId } });
            console.log("myrecipe.name", myRecipe.name);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        let recipes;
        try {
            recipes = await Recipe.findAll({
                where: {
                    id: {
                        [Sequelize.Op.ne]:recipeId
                    },
                },
            });
            console.log("recipes", recipes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        const allrecipe = recipes.map((recipe) => {
            return {
                id: recipe.id,
                name: recipe.name,
            };
        });
        const tabRecipe = allrecipe.map((item) => `${item.id}:${item.name}`).join(', ');


        const profilBot = `profilBotn Voici les recettes ainsi que leurs id qui sont issues de ma base de données.
            Les données sont écrite de cette facon identifiant:nom_de_la_recette.

            voici les recettes de ma base de données:  ${tabRecipe}

        J'aimerais que pour cette recette: ${myRecipe}, tu me donnes uniquement quatre recettes qui se rapproche le plus possible en fonction des ingrédients qui la compose.

        Si il y a moins de quatre recettes similaire tiré de ma base de données, tu m'ajouteras le nombre nécessaire de recette pour en avoir quatre au total. 

        retournes UNIQUEMENT et seulement un objet JSON et pas d'autres textes, le JSON aura cette forme :
            [{"id": 11,"recette": "crepe au chocolat"},{"id": 17,"recette": "Pain au chocolat"},{"id": 14,"recette": "gateau a la fraise"},{"id": 16,"recette": "crepe au sucre"}]`;


        answer = await getAnswer(tabRecipe, myRecipe, profilBot);
        console.log("answer2", answer)

        const debutIndice = answer.indexOf('[');
        const finIndice = answer.lastIndexOf(']');

// Extraire la sous-chaîne entre "[" et "]"
        const answer2 = answer.substring(debutIndice, finIndice + 1);

        console.log("donneesJson", typeof answer2)

         const answerJson = JSON.parse(answer2);
        console.log("donneesJson2", typeof answerJson)
        console.log("donneesJson2", answerJson)


         const recipeIds = answerJson.map(recipe => recipe.id);

        console.log("recipeIds", recipeIds)

        const recipe = await Recipe.findAll({
            where: {
                id: recipeIds
            }
        });
        console.log("recipe", recipe)


        res.status(200).json({
            answer: recipe,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRecomendation };

async function getAnswer(tabRecipe, myRecipe,profilBot) {
    console.log("tabRecipe", tabRecipe);
    console.log("myRecipe", myRecipe.name);
    console.log("profilBot", profilBot);
    try {
        if (!tabRecipe || !myRecipe || !profilBot) {
            return "missing parameters answer"
        }
        const question = myRecipe.name;
        const answer = await bot(profilBot, question);
        console.log("answer", answer)
        return answer;
    } catch (error) {
        return error.message;
    }
}
