'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Acquisitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assetName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      acquiredTo: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      requestedBy: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      decision: {
        type: Sequelize.STRING
      },
      decisionReason: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Acquisitions');
  }
};