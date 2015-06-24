// var fs = require('fs');
var Sequelize = require('sequelize');
var db = 'mysql://root:password@10.63.82.28:3306/miyamoto';
var sequelize = new Sequelize(db);

// module.exports.login = function login(username, password) {
//   return new Promsise(function(resolve, reject) {
//     fs.readFile('src/model/users.json', { encoding: 'utf-8' }, function(err, data) {
//       if (err) {
//         return reject(err);
//       }
//
//       var users = {};
//       try {
//         users = JSON.parse(data);
//       } catch(err) {
//         return reject(err);
//       }
//
//       if (users[username] !== password) {
//         return reject(false);
//       }
//
//       return resolve(true);
//     });
//   })
// };

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
},
 {
   timestamps: false
 });

var users_data = [
  { username: 'a', password: 'a@@' },
  { username: 'b', password: 'b@@' },
  { username: 'c', password: 'c@@' },
  { username: 'd', password: 'd@@' },
  { username: 'e', password: 'e@@' }
];

module.exports.login = function login(username, password) {
  return sequelize.sync().then(function(result) {
    console.log('connected to DB');
    return Users.findOne({ where: {
      username: username
      }
    });
  }).then(function(user) {
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    return true;
  });
};

var test_data = [
  { username: 'a', password: 'a@@', result: true },
  { username: 'b', password: 'b@@', result: true },
  { username: 'c', password: 'hoge', result: false },
  { username: 'hoge', password: 'a@@', result: false },
  { username: 'fuga', password: 'hoge', result: false },
  { username: '', password: 'a@@', result: false },
  { username: 'a', password: '', result: false },
  { username: '', password: '', result: false },
];

test_data.forEach(function(test_data) {
  module.exports.login(test_data.username, test_data.password).then(function(result){
    console.log(result === test_data.result);
  }).catch(function(err){
    console.log('error');
    console.log(err);
  });
})
