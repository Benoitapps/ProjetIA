module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
  
    class Comment extends Model {}
  
    Comment.init(
      {
        note:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        message:{
          type: DataTypes.TEXT,
          allowNull: false,
        },
        
      },
      {
        tableName: "comments",
        sequelize: connection,
        timestamps: false,
        //paranoid: true // soft delete
      }
    );
  
  
    return Comment;
  };
  