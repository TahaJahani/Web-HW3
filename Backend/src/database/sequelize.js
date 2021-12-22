const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const NoteModel = require('./models/note')
const TokenModel = require('./models/token')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const Note = NoteModel(sequelize, Sequelize)
const Token = TokenModel(sequelize, Sequelize)

Note.belongsTo(User)
User.hasMany(Note)
User.hasMany(Token)
Token.belongsTo(User)

// sequelize.sync()
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
  User,
  Note,
  Token,
}