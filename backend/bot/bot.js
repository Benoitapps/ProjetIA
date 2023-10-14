const OpenAi = require("openai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");

require("dotenv").config({ path: ".env.local", override: true });

async function bot(profilBot, question) {
  const openai = new OpenAi({
    apiKey: process.env.API_KEY,
  });

  try {
    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: profilBot,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const content = completions.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate bot response.");
  }
}


async function botImage(formImage,sizeImage) {
  const openai = new OpenAi({
    apiKey: process.env.API_KEY,
  });
  const image = await openai.images.generate({ prompt: formImage, size: sizeImage });
  return image.data;
}

module.exports = {bot, botImage};