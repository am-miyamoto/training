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

var password_confirm_failed = [
    [ 'aaaaaa', 'bbbbbb', 1 ]
  , [ 'aaaaaa', 'aaaaab', 1 ]
  , [ '|aaaaa', 'aaaaaa', 2 ]
  , [ 'aBcDeFgH', 'aBcDeFgG', 1 ]
  , [ '-+!@#*&^', '-+!@#*&-', 1 ]
  , [ '%~aA#*&^', '%~aA#*&-', 1 ]
];

describe('username validation is succeeded at login: ', function() {
  username_valid.forEach(function(username) {
    it('username is ' + username, function() {
      var params = {
        username: username,
        password: 'aaaaaa'
      };
      var errors = validater.loginValidation(params);
      assert.strictEqual(errors.length, 0);
    });
  });
});

describe('username validation is succeeded at register: ', function() {
  username_valid.forEach(function(username) {
    it('username is ' + username, function() {
      var params = {
        username: username,
        password: 'aaaaaa',
        confirm_password: 'aaaaaa'
      };
      var errors = validater.registerValidation(params);
      assert.strictEqual(errors.length, 0);
    });
  });
});

describe('username validation is failed at login: ', function() {
  username_invalid.forEach(function(invalid_arry) {
    it('username is ' + invalid_arry[0], function() {
      var params = {
        username: invalid_arry[0],
        password: 'aaaaaa'
      };
      var errors = validater.loginValidation(params);
      assert.strictEqual(errors.length, invalid_arry[1]);
    });
  });
});

describe('username validation is failed at register: ', function() {
  username_invalid.forEach(function(invalid_arry) {
    it('username is ' + invalid_arry[0], function() {
      var params = {
        username: invalid_arry[0],
        password: 'aaaaaa',
        confirm_password: 'aaaaaa'
      };
      var errors = validater.registerValidation(params);
      assert.strictEqual(errors.length, invalid_arry[1]);
    });
  });
});

describe('password validation is succeeded at login:', function() {
  password_valid.forEach(function(password) {
  it('password is ' + password, function() {
      var params = {
        username: 'aaaaaa',
        password: password
      };
      var errors = validater.loginValidation(params);
      assert.strictEqual(errors.length, 0);
    });
  });
});

describe('password validation is succeeded at register:', function() {
  password_valid.forEach(function(password) {
  it('password is ' + password, function() {
      var params = {
        username: 'aaaaaa',
        password: password,
        confirm_password: password
      };
      var errors = validater.registerValidation(params);
      assert.strictEqual(errors.length, 0);
    });
  });
});

describe('password validation is failed at login', function() {
  password_invalid.forEach(function(invalid_arry) {
    it('password is ' + invalid_arry[0], function() {
      var params = {
        username: 'aaaaaa',
        password: invalid_arry[0]
      };
      var errors = validater.loginValidation(params);
      assert.strictEqual(errors.length, invalid_arry[1]);
    });
  });
});

describe('password validation is failed at register', function() {
  password_invalid.forEach(function(invalid_arry) {
    it('password is ' + invalid_arry[0], function() {
      var params = {
        username: 'aaaaaa',
        password: invalid_arry[0],
        confirm_password: invalid_arry[0]
      };
      var errors = validater.registerValidation(params);
      assert.strictEqual(errors.length, invalid_arry[1]);
    });
  });
});

describe('passwrod confirmation failed at register: ', function() {
  password_confirm_failed.forEach(function(invalid_arry) {
    it('password is ' + invalid_arry[0] + ' and confirm password is ' + invalid_arry[1], function() {
      var params = {
        username: 'aaaaaa',
        password: invalid_arry[0],
        confirm_password: invalid_arry[1]
      };
      var errors = validater.registerValidation(params);
      assert.strictEqual(errors.length, invalid_arry[2]);
    });
  });
});
