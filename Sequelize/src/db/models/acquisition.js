'use strict';
module.exports = (sequelize, DataTypes) => {
  const Acquisition = sequelize.define('Acquisition', {
    assetName: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      defaultValue: 'N/A'
    },
    acquiredTo: DataTypes.STRING,
    reason: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    requestedBy: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    decision: {
      type: DataTypes.STRING,
      defaultValue: 'N/A'
    },
    decisionReason: {
      type: DataTypes.STRING,
      defaultValue: 'N/A'
    }
  }, {});
  Acquisition.associate = function(models) {
    // associations can be defined here
  };
  return Acquisition;
};