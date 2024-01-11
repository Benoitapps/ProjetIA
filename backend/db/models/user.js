module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");

  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      calorie_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      seasons: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      tableName: "users",
      sequelize: connection,
      timestamps: false,
      //paranoid: true // soft delete
    }
  );


  return User;
};