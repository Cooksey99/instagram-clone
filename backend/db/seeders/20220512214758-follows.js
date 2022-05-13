'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Follows', [
      {
        followed_user_id: 2,
        following_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followed_user_id: 3,
        following_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followed_user_id: 4,
        following_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followed_user_id: 1,
        following_user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Follows', null, {});
  }
};
