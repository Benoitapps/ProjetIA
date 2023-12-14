const bot = require("../bot/bot").bot;

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

        console.log("before recipes-----------------------------------------")
        const recipes = await Recipe.findAll({
            include: [{
                model: Ingredient,
            }],
        });
        console.log("after recipes-----------------------------------------")
        console.log(recipes)

        const question_old = `
            Je veux, dans un premier temps, que tu me donnes la description (moins de 300 caractères) et le temps de préparation total de cette recette : ${req.body.recipe}.
            Je veux dans un second temps, que tu me donnes 3 autres recettes (avec l'ingrédient principal en commun)
            qui sont similaires à celle que je t'ai donné, avec une description (moins de 300 caractères) et le temps de préparation total.
            Le tout au format JSON et de la facon suivante et pas autrement:
            [
                {
                    "name": "nom de la recette principale",
                    "description": "description de la recette",
                    "time": "temps de préparation total de la recette",
                },
                {
                    name: 'Tarte aux poires',
                    description: "Une tarte succulente aux poires juteuses et parfumées, sublimées par une délicieuse crème d'amandes et une pâte croustillante.",
                    time: '1h30'
                },
                {
                    name: 'Tarte aux fraises',
                    description: "Une tarte aux fraises gourmande et acidulée, avec une pâte croustillante et une garniture de fraises fraîches nappées d'une délicate gelée.",
                    time: '45 minutes'
                },
                {
                    name: 'Tarte aux cerises',
                    description: 'Une tarte aux cerises succulente et juteuse, avec une pâte légère et croustillante et une généreuse garniture de cerises fraîches.',
                    time: '1h15'
                }
            ]
            Je ne veux pas d'autres informations inutiles, je veux que ta réponse ne soit que du JSON.
        `;

        // const answer = await bot(contextBot, question);
        const answerJsonObject = JSON.parse(recipes);

        res.status(200).json(answerJsonObject);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRecipes };
