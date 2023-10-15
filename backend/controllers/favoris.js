const Favoris = require("../db").Favoris;

async function addFavoris(req, res) {
    try {
        if (!req.body?.userId || !req.body?.recipeId) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const userId = req.body.userId;
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
    if (!req.body?.userId || !req.body?.recipeId) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    const userId = req.body.userId;
    const recipeId = req.body.recipeId;

    const favoris = await Favoris.destroy({
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


async function getFavoris(req, res) {
    try {
        if (!req.body?.userId || !req.body?.recipeId) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const userId = req.body.userId;

        const favoris = await Favoris.findAll({
          where: {
            user_id: userId,
            like: true
          }
        });

        const recipeIds = favoris.map(favori => favori.recipe_id);

        res.status(201).json({
            favoris: recipeIds,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}


module.exports = { addFavoris, getFavoris, deleteFavoris };
