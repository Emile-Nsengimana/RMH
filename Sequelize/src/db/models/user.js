'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      unique: true,
      type: DataTypes.STRING
    },
    gender: DataTypes.STRING,
    department: DataTypes.STRING,
    type: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.removeAttribute('id');
  return User;
};