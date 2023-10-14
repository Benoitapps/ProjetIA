module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Recipe extends Model {}
  
    Recipe.init(
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        description:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        
      },
      {
        tableName: "recipes",
        sequelize: connection,
        //timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Recipe;
  };
  