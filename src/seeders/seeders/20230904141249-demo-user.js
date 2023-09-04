'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: 'Sinoo1',
        password: '123',
        username: 'sn11'
      },
      {
        email: 'Sinoo2',
        password: '123',
        username: 'sn12'
      },
      {
        email: 'Sinoo3',
        password: '123',
        username: 'sn13'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
