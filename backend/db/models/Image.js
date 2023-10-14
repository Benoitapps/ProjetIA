module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Image extends Model {}
  
    Image.init(
      {
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        src: {
            type: DataTypes.TEXT, // Change the type to VARCHAR(1000)
            allowNull: false,
          },
      },
      {
        tableName: "images",
        sequelize: connection,
        //timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Image;
  };
  