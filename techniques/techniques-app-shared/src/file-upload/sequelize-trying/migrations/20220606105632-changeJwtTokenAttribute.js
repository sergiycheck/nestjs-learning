'use strict';

/*eslint-disable*/
const { TableNames } = require('../table-names');
/*eslint-enable*/

module.exports = {
  async up(queryInterface, Sequelize) {
    //The maximum limit of size character using character varying data type in PostgreSQL is 10485760.
    return await queryInterface.changeColumn(TableNames.Users, 'googleJwtToken', {
      type: Sequelize.DataTypes.STRING(10000),
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.changeColumn(TableNames.Users, 'googleJwtToken', {
      type: Sequelize.DataTypes.STRING,
    });
  },
};
