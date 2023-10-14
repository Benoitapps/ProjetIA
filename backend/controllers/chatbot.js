const OpenAi = require("openai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");

require("dotenv").config({ path: ".env.local", override: true });

async function bot(question) {
  const openai = new OpenAi({
    apiKey: process.env.API_KEY,
  });

  

  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Tu es un un chef étoilé au guide michelin ayant une 15aines d années d expérience dans le métier avec plusieurs concours culinaires gagnés à l internationnal",
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

async function getAnswer(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const question = req.body.question;
    const answer = await bot(question);
    res.status(200).json({ answer: answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAnswer };
