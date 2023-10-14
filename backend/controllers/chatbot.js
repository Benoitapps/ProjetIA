const OpenAi = require("openai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");
const bot = require("../bot/bot").bot;

require("dotenv").config({ path: ".env.local", override: true });

const profilBot = "Tu es un un chef étoilé au guide michelin ayant une 15aines d années d expérience dans le métier avec plusieurs concours culinaires gagnés à l internationnal"


async function getAnswer(req, res) {
  try {
    if (!req.body?.question) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const question = req.body.question;
    const answer = await bot(profilBot, question);
    res.status(200).json({ answer: answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAnswer };
