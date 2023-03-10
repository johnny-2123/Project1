'use strict';


/** @type {import('sequelize-cli').Migration} */
let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'GroupMembers';

    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        userId: 1,
        status: 'active'
      },
      {
        groupId: 1,
        userId: 2,
        status: 'co-host'
      },
      {
        groupId: 1,
        userId: 3,
        status: 'active'
      },
      {
        groupId: 1,
        userId: 4,
        status: 'active'
      },
      {
        groupId: 1,
        userId: 5,
        status: 'active'
      }, {
        groupId: 1,
        userId: 6,
        status: 'active'
      }, {
        groupId: 1,
        userId: 7,
        status: 'active'
      }, {
        groupId: 1,
        userId: 8,
        status: 'active'
      }, {
        groupId: 1,
        userId: 9,
        status: 'active'
      }, {
        groupId: 1,
        userId: 10,
        status: 'active'
      }, {
        groupId: 1,
        userId: 11,
        status: 'pending'
      }, {
        groupId: 1,
        userId: 12,
        status: 'pending'
      }, {
        groupId: 1,
        userId: 13,
        status: 'pending'
      }, {
        groupId: 1,
        userId: 14,
        status: 'pending'
      }, {
        groupId: 1,
        userId: 15,
        status: 'pending'
      }, {
        groupId: 2,
        userId: 4,
        status: 'active'
      }, {
        groupId: 2,
        userId: 2,
        status: 'co-host'
      }, {
        groupId: 2,
        userId: 5,
        status: 'active'
      }, {
        groupId: 2,
        userId: 7,
        status: 'active'
      }, {
        groupId: 2,
        userId: 9,
        status: 'active'
      }, {
        groupId: 2,
        userId: 10,
        status: 'pending'
      }, {
        groupId: 2,
        userId: 14,
        status: 'pending'
      }, {
        groupId: 2,
        userId: 15,
        status: 'pending'
      }, {
        groupId: 3,
        userId: 3,
        status: 'active'
      },
      {
        groupId: 3,
        userId: 1,
        status: 'active'
      },
      {
        groupId: 3,
        userId: 4,
        status: 'active'
      }, {
        groupId: 3,
        userId: 2,
        status: 'co-host'
      },
      {
        groupId: 4,
        userId: 1,
        status: 'active'
      },
      {
        groupId: 4,
        userId: 4,
        status: 'active'
      }, {
        groupId: 4,
        userId: 2,
        status: 'active'
      }, {
        groupId: 5,
        userId: 2,
        status: 'active'
      }, {
        groupId: 5,
        userId: 4,
        status: 'active'
      }, {
        groupId: 5,
        userId: 6,
        status: 'active'
      }, {
        groupId: 5,
        userId: 8,
        status: 'active'
      }, {
        groupId: 5,
        userId: 10,
        status: 'active'
      }, {
        groupId: 5,
        userId: 12,
        status: 'active'
      }, {
        groupId: 5,
        userId: 14,
        status: 'active'
      }, {
        groupId: 5,
        userId: 15,
        status: 'active'
      }, {
        groupId: 6,
        userId: 3,
        status: 'active'
      }, {
        groupId: 6,
        userId: 7,
        status: 'active'
      }, {
        groupId: 6,
        userId: 8,
        status: 'active'
      }, {
        groupId: 6,
        userId: 13,
        status: 'active'
      }, {
        groupId: 6,
        userId: 14,
        status: 'active'
      }, {
        groupId: 7,
        userId: 1,
        status: 'active'
      }, {
        groupId: 7,
        userId: 2,
        status: 'active'
      }, {
        groupId: 7,
        userId: 3,
        status: 'active'
      }, {
        groupId: 7,
        userId: 4,
        status: 'active'
      }, {
        groupId: 7,
        userId: 6,
        status: 'active'
      }, {
        groupId: 7,
        userId: 7,
        status: 'active'
      }, {
        groupId: 7,
        userId: 11,
        status: 'active'
      }, {
        groupId: 7,
        userId: 12,
        status: 'active'
      },


    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'GroupMembers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
