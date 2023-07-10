const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const UserSchedule = sequelize.define(
    'UserSchedule',
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );

  UserSchedule.associate = (models) => {
    UserSchedule.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
    UserSchedule.belongsTo(models.Schedule, {
      foreignKey: 'scheduleId',
      as: 'schedule',
    });
    // 추가적인 관계 정의
  };

  return UserSchedule;
};
