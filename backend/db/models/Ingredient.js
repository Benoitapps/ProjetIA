module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Ingredient extends Model {}
  
    Ingredient.init(
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantite: {
            type: DataTypes.STRING, // Change the type to VARCHAR(1000)
            allowNull: false,
          },
      },
      {
        tableName: "ingredients",
        sequelize: connection,
        //timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Ingredient;
  };
  