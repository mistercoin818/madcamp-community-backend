const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const UserAuth = sequelize.define(
    'UserAuth',
    {
      KAISTId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );

  // 추가적인 관계 정의

  return UserAuth;
};
