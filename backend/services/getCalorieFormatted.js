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
        if (calorieLimit !== null) {
            return `Je souhaite découvrir des recettes en respectant une limite de ${calorieLimit} calories. 
            Pouvez-vous me suggérer des plats délicieux qui correspondent à cette restriction calorique ?`;
        }
    }

    return "";
}

module.exports = { getCalorieFormatted };