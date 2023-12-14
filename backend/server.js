const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: ".env.local", override: true });

const userRoutes = require("./routes/user");
const chatbotRoutes = require("./routes/chatbot");
const recipebotRoutes = require("./routes/recipe");
const searchRoutes = require("./routes/search");
const favorisRoutes = require("./routes/favoris");
const commentRoutes = require("./routes/comment");
const foodPreferenceRoutes = require("./routes/foodPreference");
const recomendationRoutes = require("./routes/recomendation");

const app = express();

// Use to allow cross-origin requests
app.use(cors({
    origin: [`${process.env.URL}:${process.env.PORT_FRONT}`, 'http://loclhost:3000/'],

    credentials : true,
  }));

//cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use("/", userRoutes);
app.use("/chat", chatbotRoutes);
app.use("/recette", recipebotRoutes);
app.use("/search", searchRoutes);
app.use("/favoris", favorisRoutes);
app.use("/comment", commentRoutes);
app.use("/foodPreference", foodPreferenceRoutes);
app.use("/recomendation", recomendationRoutes);

const port = process.env.PORT_BACK;
const hostname = process.env.DOMAIN_NAME;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;