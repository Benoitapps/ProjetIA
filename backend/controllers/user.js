const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db").User;
const generateToken = require("../utils/generateToken");
require("dotenv").config({ path: ".env.local", override: true });

async function signup(req, res) {
  try {
    if (!req.body?.email || !req.body?.password || !req.body?.website) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    if (!/\S+@\S+\.\S+/.test(req.body.email)) {
      return res
        .status(400)
        .json({
          error: "L'adresse e-mail est invalide.",
        });
    }

    if (req.body.password.length < 8 || req.body.password.length > 32) {
      return res
        .status(400)
        .json({
          error: "Le mot de passe doit contenir entre 8 et 32 caractères.",
        });
    }

    const usertest = await User.findOne({
      where: { email: req.body.email },
    });

    if (usertest) {
      return res.status(400).json({ error: "Adresse mail incorrecte" });
    }

    const apiToken = generateToken(32);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = User.create({
      email: req.body.email,
      password: hashedPassword,
      website: req.body.website,
      api_token: apiToken,
    });

    res.status(201).json({
      message: "Utilisateur créé !",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    if (!req.body?.email || !req.body?.password) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Utilisateur ou Mot de passe incorrect!" });
    }

    if (user.is_verified === false) {
      return res
        .status(401)
        .json({ error: "Votre compte doit être validé par un administrateur" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Utilisateur ou Mot de passe incorrect!" });
    }

    const token = jwt.sign(
      {
        userToken: user.api_token,
        userEmail: user.email,
        userRole: user.role,
        userId: user.id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // Durée de validité du cookie en millisecondes (24 heures dans cet exemple)
      httpOnly: true, // Empêche l'accès au cookie depuis JavaScript côté client
      secure: false, // Le cookie sera envoyé uniquement via une connexion HTTPS si votre application est en production
      sameSite: false,
      signed: false,
    });

    res.status(200).json({
      userId: user.id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUser(req, res) {
  User.findAll()
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
}

function getConnectedUser(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userEmail = decoded.userEmail;

    // Rechercher l'utilisateur correspondant à l'ID
    User.findOne({ where: { email: userEmail } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Renvoyer les informations de l'utilisateur connecté
        res.status(200).json({
          userId: user.id,
          email: user.email,
          website: user.website,
          apiToken: user.api_token,
          // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

function getConnectedUserNav(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userEmail = decoded.userEmail;

    // Rechercher l'utilisateur correspondant à l'ID
    User.findOne({ where: { email: userEmail } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Renvoyer les informations de l'utilisateur connecté
        res.status(200).json({
          userId: user.id,
          email: user.email,
          apiToken: user.api_token,
          role: user.role,
          // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  signup,
  login,
  getUser,
  getConnectedUser,
  logout,
  getConnectedUserNav,
};
