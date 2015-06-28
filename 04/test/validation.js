var validater = require('../public/js/validation')
  , assert = require('assert')
  ;

var username_valid = [
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

var username_invalid = [
    'aaa'
  , 'abc'
  , 'ABC'
  , 'aBc'
  , '!_-_'
  , '-+!@#*'
  , 'abcdefghi'
  , 'ABCDEFGHI'
];

var password_valid = [
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

var password_invalid = [
    'aaaaa'
  , 'ABCDE'
  , 'aBcDe'
  , '=!_-_|'
  , 'abcdefghi'
  , 'ABCDEFGHI'
];

describe('validation username', function() {
  it('username is valid', function() {
    username_valid.forEach(function(username) {
      console.log(username);
      var errors = validater.validation({ username: username, password: 'aaaaaa' });
      assert.strictEqual(errors.length, 0);
    });
  });
  it('username is invalid', function() {
    username_invalid.forEach(function(username) {
      console.log(username);
      var errors = validater.validation({ username: username, password: 'aaaaaa' });
      assert.notStrictEqual(errors.length, 0);
    });
  });
});

describe('validation password', function() {
  it('password is valid', function() {
    password_valid.forEach(function(password) {
      console.log(password);
      var errors = validater.validation({ username: 'aaaaaaa', password: password });
      assert.strictEqual(errors.length, 0);
    });
  });
  it('password is invalid', function() {
    password_invalid.forEach(function(password) {
      console.log(password);
      var errors = validater.validation({ username: 'aaaaaaa', password: password });
      assert.notStrictEqual(errors.length, 0);
    });
  });
});
