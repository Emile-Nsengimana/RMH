'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    serialNo: {
      unique: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    department: DataTypes.STRING,
    building: DataTypes.STRING,
    addedBy: DataTypes.STRING
  }, {});
  Asset.associate = function(models) {
    // associations can be defined here
  };
  Asset.removeAttribute('id');
  return Asset;
};