'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    public_id: DataTypes.STRING
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
  };
  return photo;
};