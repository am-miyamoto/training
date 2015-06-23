var fs = require('fs');

module.exports.login = function login(username, password, callback) {
  fs.readFile('src/model/users.json', { encoding: 'utf-8' }, function(err, data) {
    if (err) {
      return callback(err);
    }

    var users = {};
    try {
      users = JSON.parse(data);
    } catch(err) {
      return callback(err);
    }

    if (users[username] === password) {
      return callback(null, true);
    }
    return callback(null, false);
  });
}
