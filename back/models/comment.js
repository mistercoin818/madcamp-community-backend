// 같은 폴더에 user_auth_info.csv 있어야 함
// KAISTId,name
// 20190000,홍길동
// ...

const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    'Comment',
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contents: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
      group: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
    // 추가적인 관계 정의
  };

  return Comment;
};
