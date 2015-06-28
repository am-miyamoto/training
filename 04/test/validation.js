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

var username_false = [
    'aaa'
  , 'abc'
  , 'ABC'
  , 'aBc'
  , '!_-_'
  , '-+!@#*'
  , 'abcdefghi'
  , 'ABCDEFGHI'
];

var password_true = [
    'aaaaaa'
  , 'abcdef'
  , 'ABCDEF'
  , 'aBcDeF'
  , '-+!@#*'
  , '&^%~aA'
  , 'aaaaaaaa'
  , 'abcdefgh'
  , 'ABCDEFGH'
  , 'aBcDeFgH'
  , '-+!@#*&^'
  , '%~aA#*&^'
];

describe('validation username', function() {
  it('username is valid', function(done) {
    username_true.forEach(function(username) {
      console.log(username);
      var errors = validater.validation({ username: username, password: 'aaaaaa' });
      assert.strictEqual(errors.length, 0);
    });
    done();
  });
  it('username is invalid', function(done) {
    username_false.forEach(function(username) {
      console.log(username);
      var errors = validater.validation({ username: username, password: 'aaaaaa' });
      assert.notStrictEqual(errors.length, 0);
    });
    done();
  });
});

describe('validation password', function() {
  it('password is valid', function(done) {
    password_true.forEach(function(password) {
      console.log(password);
      var errors = validater.validation({ username: 'aaaaaaa', password: password });
      assert.strictEqual(errors.length, 0);
    });
    done();
  });
});
