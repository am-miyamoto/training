var Sequelize = require('sequelize');
var db = '';
var sequelize = new Sequelize(db);

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
},
 {
   timestamps: false
 });

var users_data = [
  { username: 'soneda', password: 'aaaaaa' },
  { username: 'miyamoto', password: 'bbbbbb' },
  { username: 'b', password: 'b@@' },
  { username: 'c', password: 'c@@' },
  { username: 'd', password: 'd@@' },
  { username: 'e', password: 'e@@' }
];

sequelize.sync().then(function(result) {
  console.log('connected to DB');
  return Users.findAll();
}).then(function(users) {
  var userDeletePromises = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDeletePromises);
}).then(function(result) {
  console.log('deleted');
  var userSavePromises = users_data.map(function(user_data) {
    var user = Users.build(user_data);
    return user.save();
  });
  return Promise.all(userSavePromises);
}).then(function(users) {
  console.log('saved length:' + users.length);
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
}).catch(function(err) {
  console.log(err);
});
