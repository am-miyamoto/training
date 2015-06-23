var login = require('./users');
console.log(users);

login('soneda', 'aaaaaa', function(err, result) {
  console.log(err, result);
});
