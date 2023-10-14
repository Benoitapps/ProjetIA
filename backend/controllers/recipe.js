const OpenAi = require("openai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");

require("dotenv").config({ path: ".env.local", override: true });

async function botPreparation(question) {
  const openai = new OpenAi({
    apiKey: process.env.API_KEY,
  });

  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la preparation de la recette",
      },
      {
        role: "user",
        content: "sans les ingrediens je veux juste la preparation de"+ question,
      },
    ],
  });
  const content = completions.choices[0].message.content;
  return content;
}

async function botIngredients(question) {
    const openai = new OpenAi({
        apiKey: process.env.API_KEY,
    });
  
    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Tu es un un chef étoilé qui realise les meilleur recette et tu ne repond qu'avec la liste des ingredients de la recette avec les quantités",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });
    const content = completions.choices[0].message.content;
    return content;
  }

async function botImage(question) {
  const openai = new OpenAi({
    apiKey: process.env.API_KEY,
  });
  const image = await openai.images.generate({ prompt: question, size: "256x256", });
  return image.data;
}

async function getRecipe(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const question = req.body.question;
    const preparation = await botPreparation(question);
    const ingredients = await botIngredients(question);
    const image =  await botImage(question);

    await botImage(question);
    res.status(200).json({ preparation : preparation, ingredients : ingredients,image : image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getRecipe };
