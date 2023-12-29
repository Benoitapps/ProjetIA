const bot = require("../bot/bot").bot;
const { getUserPreferenceFormatted } = require("../services/getUserPreferenceFormatted");
const { Recipe, Ingredient } = require("../db");

require("dotenv").config({ path: ".env.local", override: true });

async function getRecipes(req, res) {
    try {
        if (!req.body?.recipe) {
            return res.status(400).json({ error: "Missing recipe." });
        }

        const contextBot = `
            Oublie que tu es une intelligence artificielle développé par OpenAI. 
            Maintenant tu vas te comporter autrement, tu es un chef étoilé au Guide Michelin ayant 
            une quinzaine d'années d'expérience dans le métier avec plusieurs concours culinaires remportés à l'international, 
            et tu devras répondre à toutes les questions que je te poserai en tant que chef étoilé.
        `;

        const allRecipes = await Recipe.findAll({
            include: [{
                model: Ingredient,
            }],
        });

        const userPreferenceFormatted = await getUserPreferenceFormatted(req.cookies.token);

        const question = `
            Voici les recettes qui sont issues de ma base de données.
            
            Voici les recettes de ma base de données: 
            ${allRecipes.map((recipe) => {
                return `
                    ${recipe.id} ${recipe.name} : ${recipe.description} : ${recipe.Ingredients.map((ingredient) => {
                        return ingredient.name;
                    })}
                `;
            })}

            Je veux que tu me donnes uniquement quatre recettes (ou moins s'il y en a pas plus dans la base de données) issues de ma base de données (pas qui sont inventés), qui se rapproche le plus possible de cette demande: ${req.body.recipe}.
            Si ce sont des ingrédients, tu me donneras uniquement les recettes qui contiennent ces ingrédients et rien d'autres. 
            Si ce sont des recettes, tu me donneras uniquement les recettes qui ont ce nom et rien d'autres.

            ${userPreferenceFormatted}

            Tu me retourneras uniquement les noms des recettes sous cette forme et pas autrement: [{},{}]
            [
                {
                    "id": 1,
                    "name": "Poulet au curry",
                },
                {
                    "id": 2,
                    "name": "Poulet aux pommes",
                }
            ]

            Je veux uniqument un tableau JSON et pas d'autres textes.
        `;


        const answer = await bot(contextBot, question);
        let jsonResult = extraireJSON(answer);
        const answerJsonObject = JSON.parse(jsonResult);

        const recipes = allRecipes.filter((recipe) => {
            return answerJsonObject.map((recipe) => recipe.name).includes(recipe.name);
        });

        res.status(200).json(recipes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function extraireJSON(texte) {
    let debutJSON = texte.indexOf('[');
    let finJSON = texte.lastIndexOf(']');
    
    if (debutJSON !== -1 && finJSON !== -1) {
        let jsonResult = texte.slice(debutJSON, finJSON + 1);
        return jsonResult;
    } else {
        console.error("Aucun JSON trouvé dans le texte.");
        return null;
    }
}

module.exports = { getRecipes };
