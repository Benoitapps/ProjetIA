const OpenAi = require("openai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");
const bot = require("../bot/bot").bot;
const botImage = require("../bot/bot").botImage;

require("dotenv").config({ path: ".env.local", override: true });


const profilBot = "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la preparation de la recette";
const questionBot = "sans les ingrediens je veux juste la preparation de";

const profilBotIngedient = "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la liste des ingredients de la recette avec les quantités";

async function getRecipe(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const question = req.body.question;
    const preparation = await bot(profilBot,questionBot + " " + question);
    const ingredients = await bot(profilBotIngedient, question);
    const image =  await botImage(question, "256x256");

    await botImage(question);
    res.status(200).json({ preparation : preparation, ingredients : ingredients,image : image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getRecipe };
