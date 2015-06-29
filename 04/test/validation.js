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
    [ 'aaa', 1 ]
  , [ 'abc', 1 ]
  , [ 'ABC', 1 ]
  , [ 'aBc', 1 ]
  , [ '!-_', 2 ]
  , [ '-+!@#*', 1 ]
  , [ 'abcdefghi', 1 ]
  , [ 'ABCDEFGHI', 1 ]
  , [ 'aBc!EFGHI', 2 ]
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
    [ 'aaaaa', 1 ]
  , [ 'ABCDE', 1 ]
  , [ 'aBcDe', 1 ]
  , [ '=!-_|', 2 ]
  , [ '=!_-_|', 1 ]
  , [ 'abcdefghi', 1 ]
  , [ 'ABCDEFGHI', 1 ]
  , [ '||CDEFGHI', 2 ]
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
    username_invalid.forEach(function(invalid_arry) {
      console.log(invalid_arry);
      var errors = validater.validation({ username: invalid_arry[0], password: 'aaaaaa' });
      assert.strictEqual(errors.length, invalid_arry[1]);
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
    password_invalid.forEach(function(invalid_arry) {
      console.log(invalid_arry);
      var errors = validater.validation({ username: 'aaaaaaa', password: invalid_arry[0] });
      assert.strictEqual(errors.length, invalid_arry[1]);
    });
  });
});
