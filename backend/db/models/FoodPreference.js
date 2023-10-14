module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class FoodPreference extends Model {}
  
    FoodPreference.init(
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        
      },
      {
        tableName: "food_preferences",
        sequelize: connection,
        //timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return FoodPreference;
  };
  