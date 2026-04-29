module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      CommentMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    
   
      
    
    });
    return Comment;
  };