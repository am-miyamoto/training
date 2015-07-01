let Sequelize = require('sequelize')
, connection = require('./connection');

class Database {
  constructor() {
    this.sequelize = connection.getConnection();
    this.Users = this.sequelize.define('users',
    {
      username: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      timestamps: false
    });
  }

  connect() {
    return this.sequelize.sync();
  }

  login(username, password) {
    return this.Users.findOne( {
      where: {
        username: username
      }
    })
    .then((user) => {
      if (!user) {
        return false;
      }
      if (user.password !== password) {
        return false;
      }
      return true;
    });
  }

  register(username, password) {
    let user = this.Users.build({ username, password });
    return user.save()
    .catch((err) => {
      return Promise.reject('そのユーザー名は既に登録されています');
    });
  }

  getUsernames() {
    return this.Users.findAll( {
      order: [['username', 'ASC']]
    })
    .then((users) => {
      let usernames = users.map((user) => {
        return user.username;
      });
      return usernames;
    });
  }
}

module.exports = Database;
