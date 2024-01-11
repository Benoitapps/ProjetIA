const { User } = require("../db/index");
const { getConnectedUser } = require("../services/userToken");

const getCalorieFormatted = async (token) => {
    const userId = await getConnectedUser(token);
    
    if (userId) {
        const user = await User.findAll({
            where: {
                id: userId,
            },
        });

        let calorieLimit = user[0].dataValues.calorie_limit;
        if (calorieLimit >= 0) {
            return `Parmis toutes les recettes que tu vas me proposer je veux que celle ci ne dépasse pas ${calorieLimit} calories.`;
        }
    }

    return "";
}

module.exports = { getCalorieFormatted };