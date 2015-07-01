let Sequelize = require('sequelize')
  , connection = require('./connection');

function Database() {
  this.sequelize = connection.getConnection();
  this.Users = this.sequelize.define('users',
    {
      username: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      timestamps: false
    }
  );
}

Database.prototype.connect = function() {
  return this.sequelize.sync();
}

Database.prototype.login = function(username, password) {
  return this.Users.findOne( {
      where: {
        username: username
      }
    })
  .then(function(user) {
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    return true;
  });
};

Database.prototype.register = function register(username, password) {
  let params = {
    username: username,
    password: password
  };
  let user = this.Users.build(params);
  return user.save()
  .catch(function(err) {
    return Promise.reject('そのユーザー名は既に登録されています');
  });
};

Database.prototype.getUsernames = function() {
  return this.Users.findAll( {
    order: [['username', 'ASC']]
  })
  .then(function(users) {
    let usernames = users.map(function(user) {
      return user.username;
    });
    return usernames;
  });
};

module.exports = Database;
