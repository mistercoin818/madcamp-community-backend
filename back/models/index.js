'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.Sequelize = sequelize;
db.sequelize = sequelize;

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }
//
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// 여기 하는 건가?
// 예시) const User = sequelize.define('User', {
//  // 모델 정의
// }, {
//  // 옵션
// });

// table 정의 ----------------------------------------

const User = sequelize.define(
  'User',
  {
    kakaoId: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    userName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    school: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    studentId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    group: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    profileImg: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    instaAcct: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    instaPub: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    githubAcct: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    githubPub: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    linkedinAcct: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    linkedinPub: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

const Post = sequelize.define(
  'Post',
  {
    authorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: Sequelize.DataTypes.STRING(2000),
      allowNull: true,
    },
    tag: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    group: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    viewCnt: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

const Schedule = sequelize.define(
  'Schedule',
  {
    authorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: Sequelize.DataTypes.STRING(2000),
      allowNull: true,
    },
    group: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    startDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

const Comment = sequelize.define(
  'Comment',
  {
    authorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: Sequelize.DataTypes.STRING(2000),
      allowNull: true,
    },
    group: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    startDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

const UserSchedule = sequelize.define(
  'UserSchedule',
  {
    authorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    schedule: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

const UserAuth = sequelize.define(
  'UserAuth',
  {
    KAISTId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

Post.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' });
Schedule.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id' });
UserSchedule.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' });
UserSchedule.belongsTo(Schedule, { foreignKey: 'scheduleId', targetKey: 'id' });

db.User = User;
db.Post = Post;
db.Schedule = Schedule;
db.Comment = Comment;
db.UserSchedule = UserSchedule;
db.UserAuth = UserAuth;

User.init(sequelize);
Post.init(sequelize);
Schedule.init(sequelize);
Comment.init(sequelize);
UserSchedule.init(sequelize);
UserAuth.init(sequelize);

// table 정의 끝 ----------------------------------------

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;
