var Sequelize = require('sequelize');

function Database(config) {
  var options = {};
  options.host = config.host;
  if(config.logging === 'false') {
    options.logging = false;
  }
  this.sequelize = new Sequelize(config.dbname, config.username, config.password, options);

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
  var params = {
    username: username,
    password: password
  };
  var user = this.Users.build(params);
  return user.save();
};

Database.prototype.getUsernames = function() {
  return this.Users.findAll( {
    order: [['username', 'ASC']]
  })
  .then(function(users) {
    var usernames = users.map(function(user) {
      return user.username;
    });
    return usernames;
  });
};

module.exports = Database;
