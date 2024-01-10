module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Favoris extends Model {}
  
    Favoris.init(
      {
        like:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: "favoris",
        sequelize: connection,
        timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Favoris;
  };
  