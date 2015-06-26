var Sequelize = require('sequelize');

function database(config) {
  var options = {};
  options.host = config.host;
  this.sequelize = new Sequelize(config.dbname, config.username, config.password, options);

  this.Users = this.sequelize.define('users',
    {
      id: Sequelize.INTEGER,
      username: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      timestamps: false
    }
  );
}

database.prototype.connect = function() {
  return this.sequelize.sync();
}

database.prototype.login = function(username, password) {
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

database.prototype.register = function register(username, password) {
  var params = {
    username: username,
    password: password
  };
  var user = this.Users.build(params);
  return user.save();
};

database.prototype.getUsernames = function() {
  return this.Users.findAll()
   .then(function(users) {
     var usernames = users.map(function(user) {
       return user.username;
     });
     return usernames;
   });
};

module.exports = database;
