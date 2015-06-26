var Sequelize = require('sequelize');

function database(config) {
  this.sequelize = new Sequelize(config.dbname, config.username, config.password);

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

module.exports = database;
