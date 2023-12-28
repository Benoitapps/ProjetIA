const { FoodPreference } = require("../db/index");
const { getConnectedUser } = require("../services/userToken");

const getUserPreferenceFormatted = async (token) => {
    const userId = await getConnectedUser(token);
    console.log(userId)
    
    if (userId) {
        const foodPreference = await FoodPreference.findAll({
            where: {
                user_id: userId,
            },
        });
        const foodPreferenceFormatted = foodPreference.map((food) => food.name);
        console.log(foodPreferenceFormatted)
        return "Voici mes préférences alimentaires : " + foodPreferenceFormatted.join(", ") 
                + ". Je ne souhaite donc pas avoir des recettes qui contiennent ces aliments.";
    }

    return "";
}

module.exports = { getUserPreferenceFormatted };