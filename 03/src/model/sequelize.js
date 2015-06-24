var Sequelize = require('sequelize');
// var config = {
//     database: 'mysql://root:password@y.ucs.ricoh.co.jp:3306/miyamoto'
//   , username: 'root'
//   , password: 'password'
// }
// var sequelize = new Sequelize(config.database, config.username, config.password);
var db = 'mysql://root:password@10.63.82.28:3306/miyamoto';
var sequelize = new Sequelize(db);

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
  // username: 'varchar(8)',
  // password: 'varchar(8)'
},
 {
   timestamps: false
 });

sequelize.sync().then(function(result) {
  console.log('connected to DB');
  var user = Users.build({
    username: 'hoge1',
    password: 'fugapas'
  });
  return user.save();
}).then(function() {
  console.log('find all ');
  return Users.findAll();
}).then(function(users) {
  console.log('update : promise all');
  var userSavePromises = users.map(function(user){
    user.password += '@@@';
    return user.save();
  });
  return Promise.all(userSavePromises);
}).then(function(result) {
  console.log('---------');
  return Users.findAll();
}).then(function(users) {
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
  return Users.findAll();
}).then(function(users) {
  console.log('delete all');
  var userDeletePromises = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDeletePromises);
}).then(function(result) {
  return Users.findAll();
}).then(function(users) {
  console.log(users.length);
  console.log('complete!');
}).catch(function(err) {
  console.log(err);
});
