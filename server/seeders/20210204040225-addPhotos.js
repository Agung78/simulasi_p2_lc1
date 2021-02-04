'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./seeders/data.json', 'utf-8'))
    for (let i of data) {
      i.createdAt = new Date()
      i.updatedAt = new Date()
    }
    await queryInterface.bulkInsert('Photos', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Photos', null, {});
  }
};
