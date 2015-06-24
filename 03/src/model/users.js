// var fs = require('fs');
var Sequelize = require('sequelize');
var db = 'mysql://root:password@10.63.82.28:3306/miyamoto';
// var sequelize = new Sequelize(db);

function database(db) {
  this.sequelize = new Sequelize(db);

  this.Users = this.sequelize.define('users',
    {
      id: Sequelize.INTEGER,
      username: Sequelize.STRING,
      password: Sequelize.STRING
    },
    {
      timestamps: false
    });
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

module.exports = database;

// developer test
// var test_data = [
//   { username: 'a', password: 'a@@', result: false },
//   { username: 'b', password: 'b@@', result: true },
//   { username: 'c', password: 'hoge', result: false },
//   { username: 'hoge', password: 'a@@', result: false },
//   { username: 'fuga', password: 'hoge', result: false },
//   { username: '', password: 'a@@', result: false },
//   { username: 'a', password: '', result: false },
//   { username: '', password: '', result: false },
// ];
//
// var db = new module.exports.database(db);
// test_data.forEach(function(test_data) {
//   db.connect().then(function(result) {
//     console.log('connected');
//     return db.login(test_data.username, test_data.password);
//   }).then(function(result){
//     console.log(result === test_data.result);
//   }).catch(function(err){
//     console.log('error');
//     console.log(err);
//   });
// })
//
