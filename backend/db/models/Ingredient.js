module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Ingredient extends Model {}
  
    Ingredient.init(
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "ingredients",
        sequelize: connection,
        timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Ingredient;
  };
  