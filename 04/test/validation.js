var validater = require('../public/js/validation')
  , assert = require('assert')
  ;

var username_true = [
    'aaaa'
  , 'abcd'
  , 'ABCD'
  , 'aBcD'
  , '-_-_'
  , 'a-_b'
  , 'A-_B'
  , 'a-_B'
  , 'abcdef'
  , 'ABCDEF'
  , 'aB-_cD'
];

describe('validation username', function() {
  it('username is true', function(done) {
    username_true.forEach(function(username) {
      console.log(username);
      var errors = validater.validation({ username: username, password: 'aaaaaa' });
      assert.strictEqual(errors.length, 0);
    });
    done();
  });
});
