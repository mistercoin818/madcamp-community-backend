const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'Post',
    {
      // 필드 및 데이터 타입 정의
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
      tag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      group: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      viewCnt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );

  Post.associate = (models) => {
    // 관계 설정 및 다른 모델과의 관계 정의
    Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
    // ...
  };

  return Post;
};
