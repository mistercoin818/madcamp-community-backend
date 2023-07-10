const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define(
    'Schedule',
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

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
    // 추가적인 관계 정의
  };

  return Schedule;
};
