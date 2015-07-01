if(typeof module === 'object') {
  var err_definition = require('./err_definition');
}

function loginValidation(params) {
  let errors = [];
  errors = errors.concat(usernameValidater(params.username));
  errors = errors.concat(passwordValidater(params.password));
  return errors;
}

function registerValidation(params) {
  let errors = [];
  errors = errors.concat(usernameValidater(params.username));
  errors = errors.concat(passwordValidater(params.password));
  // passwordConfirmation()
  errors = errors.concat(passwordEqualityChecker(params.password, params.confirm_password));
  return errors;
}

function usernameValidater(username) {
  let errors = [];
  let username_rule = {
    min_length: 4,
    max_length: 8,
    char_rule: new RegExp('[^(a-zA-Z\-_)]')
  };
  if (!username) {
    errors.push(err_definition.username_empty);
  } else {
    if (username.length < username_rule.min_length || username.length > username_rule.max_length) {
      errors.push(err_definition.username_irregal_length);
    }
    if (username.match(username_rule.char_rule)) {
      errors.push(err_definition.username_irregal_chara);
    }
  }
  return errors;
}

function passwordValidater(password) {
  let password_rule = {
    min_length: 6,
    max_length: 8,
    char_rule: new RegExp('[^(a-zA-z\-\+!@#\*&\^%~)]')
  };
  let errors = [];
  if (!password) {
    errors.push(err_definition.password_empty);
  } else {
    if (password.length < password_rule.min_length || password.length > password_rule.max_length) {
      errors.push(err_definition.password_irregal_length);
    }
    if (password.match(password_rule.char_rule)) {
      errors.push(err_definition.password_irregal_chara);
    }
  }
  return errors;
}

function passwordEqualityChecker(password, confirm_password) {
  let errors = [];
  if (password !== confirm_password) {
    errors.push(err_definition.password_equality_failed);
  }
  return errors;
}

if(typeof module === 'object') {
  module.exports.loginValidation = loginValidation;
  module.exports.registerValidation = registerValidation;
}
