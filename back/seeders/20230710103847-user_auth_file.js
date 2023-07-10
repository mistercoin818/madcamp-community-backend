'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

const seedDataPath = path.join(__dirname, 'user_auth_info.csv');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedData = fs.readFileSync(seedDataPath, 'utf8');
    const parsedData = parse(seedData, { columns: true });
    const currentDate = new Date(); // 현재 시간

    const parsedDataWithTimestamp = parsedData.map((data) => {
      return {
        ...data,
        createdAt: currentDate, // createdAt 속성에 기본 값으로 현재 시간 설정
        updatedAt: currentDate, // updatedAt 속성에 기본 값으로 현재 시간 설정
      };
    });

    await queryInterface.bulkInsert('UserAuth', parsedDataWithTimestamp, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserAuth', null, {});
  },
};
