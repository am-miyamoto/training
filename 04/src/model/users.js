var Sequelize = require('sequelize');

function database(config) { // コンストラクタ関数は大文字始まり
  var options = {};
  options.host = config.host;
  if(config.logging === 'false') {
    options.logging = false;
  }
  // ここだけが一回にしたい。 global ではなく module local を使う方がまだ良い
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

module.exports = database;