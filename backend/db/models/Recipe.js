const {DataTypes} = require("sequelize");
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
          type: DataTypes.TEXT,
          allowNull: false,
        },
       preparation:{
          type: DataTypes.TEXT,
          allowNull: true,
       },
      src: {
          type: DataTypes.TEXT, // Change the type to VARCHAR(1000)
          allowNull: true,
      },
        
      },
      {
        tableName: "recipes",
        sequelize: connection,
        timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Recipe;
  };
  