'use strict';

/*eslint-disable*/
const { TableNames } = require('./table-names');
/*eslint-enable*/

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TableNames.Users,
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
          firstName: Sequelize.DataTypes.STRING,
          lastName: Sequelize.DataTypes.STRING,
          isActive: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
          },
          //photos[]
          email: Sequelize.DataTypes.STRING,
          pictureUrl: Sequelize.DataTypes.STRING,
          googleJwtToken: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );

      await queryInterface.createTable(
        TableNames.PublicFiles,
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
          url: Sequelize.DataTypes.STRING,
          key: Sequelize.DataTypes.STRING,
          bucket: Sequelize.DataTypes.STRING,
          eTag: Sequelize.DataTypes.STRING,
          num: Sequelize.DataTypes.INTEGER,
          userId: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: TableNames.Users,
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(TableNames.Users, { transaction });
      await queryInterface.dropTable(TableNames.PublicFiles, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
