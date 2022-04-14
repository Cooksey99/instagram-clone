'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Comments', [
      {
        post_id: 1,
        user_id: 1,
        comment: 'Hope you like!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        user_id: 2,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        user_id: 3,
        comment: 'This is great!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 2,
        user_id: 1,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 2,
        user_id: 2,
        comment: 'Amazing!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 3,
        user_id: 1,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 2,
        user_id: 1,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        user_id: 3,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        user_id: 2,
        comment: 'I love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
