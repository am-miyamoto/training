/**
 * params.username と Password を受け取り
 * 正しいフォーマットかチェックする。
 *
 * 正しい場合：空の配列
 * 正しくない場合：メッセージを入れた配列を返す
 */

function loginValidation(params) {
  var errors = [];
  errors = errors.concat(usernameValidater(params.username));
  errors = errors.concat(passwordValidater(params.password));
  return errors;
}

function registerValidation(params) {
  var errors = [];
  errors = errors.concat(usernameValidater(params.username));
  errors = errors.concat(passwordValidater(params.password));
  errors = errors.concat(passwordEqualityChecker(params.password, params.confirm_password));
  return errors;
}

function usernameValidater(username) {
  var errors = [];
  var username_rule = {
    min_length: 4,
    max_length: 8,
    char_rule: new RegExp('[^(a-zA-Z\-_)]')
  };
  if (!username) {
    errors.push(error_messages.username_empty);
  } else {
    if (username.length < username_rule.min_length || username.length > username_rule.max_length) {
      errors.push(error_messages.username_irregal_length);
    }
    if (username.match(username_rule.char_rule)) {
      errors.push(error_messages.username_irregal_chara);
    }
  }
  return errors;
}

function passwordValidater(password) {
  var password_rule = {
    min_length: 6,
    max_length: 8,
    char_rule: new RegExp('[^(a-zA-z\-\+!@#\*&\^%~)]')
  };
  var errors = [];
  if (!password) {
    errors.push(error_messages.password_empty);
  } else {
    if (password.length < password_rule.min_length || password.length > password_rule.max_length) {
      errors.push(error_messages.password_irregal_length);
    }
    if (password.match(password_rule.char_rule)) {
      errors.push(error_messages.password_irregal_chara);
    }
  }
  return errors;
}

function passwordEqualityChecker(password, confirm_password) {
  var errors = [];
  if (password !== confirm_password) {
    errors.push(error_messages.password_equality_failed);
  }
  return errors;
}

var error_messages = {
  username_empty: 'usernameを入力して下さい',
  username_irregal_chara: 'usernameに使える文字は英大小文字と-(ハイフン)です',
  username_irregal_length: 'usernameは4から8文字です',
  password_empty: 'Passwordを入力して下さい',
  password_irregal_chara: 'Passwordに使える文字は英大小文字と-,+,!,@,#,*,&,^,%,~です',
  password_irregal_length: 'Passwordは6から8文字です',
  password_equality_failed: '確認用Passwordが異なります'
};

if(typeof module === 'object') {
  module.exports.loginValidation = loginValidation;
  module.exports.registerValidation = registerValidation;
}
