const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash("admin", salt)
    return queryInterface.bulkInsert('users', [{
      username: 'admin',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};