'use strict';

/*eslint-disable*/
const { TableNames } = require('../table-names');
/*eslint-enable*/

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addConstraint(TableNames.Users, {
      type: 'UNIQUE',
      fields: ['email'],
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeConstraint(TableNames.Users, {
      type: 'UNIQUE',
      fields: ['email'],
    });
  },
};
