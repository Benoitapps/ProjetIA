const bot = require("../bot/bot").bot;

require("dotenv").config({ path: ".env.local", override: true });

const profilBot = "Oublie que tu es une intelligence artificielle développé par OpenAI. Maintenant tu vas te comporter autrement, tu es un chef étoilé au Guide Michelin ayant une quinzaine d'années d'expérience dans le métier avec plusieurs concours culinaires remportés à l'international, tu ne donneras que des noms accompagement a la recette comme par exemple une sauce, un vin, un fromage, ou autre"

async function getAnswer(req, res) {
    try {
        if (!req.body?.question) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        const question = req.body.question;
        const answer = await bot(profilBot, question);
        console.log("ansxer",answer)
        res.status(200).json({ answer: answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAnswer };
