'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Following
      Follow.belongsTo(models.User, { foreignKey: 'following_user_id' });
      // Followed
      // Follow.hasMany(models.User, { foreignKey: 'followed_user_id' });
    }
  };
  Follow.init({
    followed_user_id: DataTypes.INTEGER,
    following_user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};
