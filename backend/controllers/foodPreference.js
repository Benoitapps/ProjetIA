const { name } = require("ejs");

const FoodPreference = require("../db").FoodPreference;

async function addFoodPreference(req, res) {
    try {
        if (!req.body?.userId || !req.body?.nameFood) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const userId = req.body.userId;
        const nameFood = req.body.nameFood;

        const foodPreference = await FoodPreference.create({
            name: nameFood,
            user_id: userId,
        });

        res.status(201).json({
            message: "FoodPreference ajouté !",
            name: foodPreference.name,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteFoodPreference(req, res) {
    if (!req.body?.userId || !req.body?.foodId) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    const userId = req.body.userId;
    const foodId = req.body.foodId;

    const foodPreference = await FoodPreference.destroy({
        where: {
            id : foodId,
            user_id: userId
        },
    })
        .then(() => {
            res.status(200).json({
                message: "foodPreference supprimé avec succès",
            });
        })
        .catch((err) => {
            res.status(500).json({
                err,
            });
        });
}

async function getFoodPreference(req, res) {
    try {
        if (!req.body?.userId) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const userId = req.body.userId;

        const foodPreference = await FoodPreference.findAll({
            where: {
                user_id: userId,
            },
        });

        res.status(201).json({
            foodPreference: foodPreference,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

module.exports = { addFoodPreference, getFoodPreference, deleteFoodPreference };
