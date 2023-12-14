const Favoris = require("../db").Favoris;
const Recipe = require("../db").Recipe;
const Image = require("../db").Image;
const {getConnectedUser} = require("../services/userToken");

async function addFavoris(req, res) {
    try {
        if (!req.body?.recipeId) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        const token = req.cookies.token;
        console.log("token", token);

        const userId = await getConnectedUser(token);
        console.log(userId);

        const recipeId = req.body.recipeId;

        const favoris = await Favoris.create({
            like: true,
            user_id: userId,
            recipe_id: recipeId
        });

        res.status(201).json({
            message: "Favoris ajouté !",
            like: favoris.like,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteFavoris(req, res) {

    if (!req.body?.recipeId) {
        return res.status(400).json({ error: "Missing parameters" });
    }
    const token = req.cookies.token;
    console.log("token", token);

    const userId = await getConnectedUser(token);
    console.log(userId);

    const recipeId = req.body.recipeId;

    await Favoris.destroy({
        where: {
            user_id: userId,
            recipe_id: recipeId
        },
    })
        .then(() => {
            res.status(200).json({
                message: "Favoris supprimé avec succès",
            });
        })
        .catch((err) => {
            res.status(500).json({
                err,
            });
        });
}

async function getStatFavorite(req, res) {
    if (!req.params?.recipeId) {
        return res.status(400).json({ error: "Missing parameters" });
    }
    console.log("req.params", req.params)
    const token = req.cookies.token;
    console.log("token", token);

    try {
        const userId = await getConnectedUser(token);
        console.log(userId);

        const recipeId = req.params.recipeId;

        const favoris = await Favoris.findOne({
            where: {
                user_id: userId,
                recipe_id: recipeId,
                like: true
            }
        });
        console.log("favoris", favoris)

        const isFavorite = favoris ? true : false;

        return res.status(200).json({ isFavorite });
    } catch (error) {
        console.error("Error in getStatFavorite:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getFavoris(req, res) {
    try {

        const token = req.cookies.token;
        console.log("token", token);

        const userId = await getConnectedUser(token);
        console.log(userId);


        const favoris = await Favoris.findAll({
          where: {
            user_id: userId,
            like: true
          }
        });

        const recipeIds = favoris.map(favori => favori.recipe_id);

        console.log("recipeIds", recipeIds)


        const tabRecipe = await Recipe.findAll({
            where: {
                id: recipeIds
            }
        });

        res.status(201).json({
            favoris: favoris,
            recipes: tabRecipe,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}


module.exports = { addFavoris, getFavoris, deleteFavoris, getStatFavorite };
