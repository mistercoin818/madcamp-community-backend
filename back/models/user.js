const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      kakaoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instaAcct: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instaPub: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      githubAcct: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      githubPub: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      linkedinAcct: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedinPub: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'authorId',
      as: 'posts',
    });
  };

  return User;
};
