/**
 * params.username と Password を受け取り
 * 正しいフォーマットかチェックする。
 *
 * 正しい場合：空の配列
 * 正しくない場合：メッセージを入れた配列を返す
 */
function validation(params) {
  var errors = [];
  errors = errors.concat(usernameValidater(params.username));
  errors = errors.concat(passwordValidater(params.password));
  if (params.confirm_password) {
    if (!passwordEqualityChecker(params.password, params.confirm_password)) {
      errors.push(error_messages.password_equality_failed);
    }
  } else {
    errors.push(error_messages.confirm_password_empty);
  }
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
  if (password === confirm_password) {
    return true;
  }
  return false;
}

var error_messages = {
  username_empty: 'usernameを入力して下さい',
  username_irregal_chara: 'usernameに使える文字は英大小文字と-(ハイフン)です',
  username_irregal_length: 'usernameは4から8文字です',
  password_empty: 'Passwordを入力して下さい',
  password_irregal_chara: 'Passwordに使える文字は英大小文字と-,+,!,@,#,*,&,^,%,~です',
  password_irregal_length: 'Passwordは6から8文字です',
  confirm_password_empty: '確認用Passwordを入力して下さい',
  password_equality_failed: '同じPasswordを入力して下さい'
};

if(typeof module === 'object') {
  module.exports.validation = validation;
}
