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
    errors.push(setErrorMessage('username_empty'));
  } else {
    if (username.length < username_rule.min_length || username.length > username_rule.max_length) {
      errors.push(setErrorMessage('username_irregal_length'));
    }
    if (username.match(username_rule.char_rule)) {
      errors.push(setErrorMessage('username_irregal_chara'));
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
    errors.push(setErrorMessage('password_empty'));
  } else {
    if (password.length < password_rule.min_length || password.length > password_rule.max_length) {
      errors.push(setErrorMessage('password_irregal_length'));
    }
    if (password.match(password_rule.char_rule)) {
      errors.push(setErrorMessage('password_irregal_chara'));
    }
  }
  return errors;
}

function setErrorMessage(error) {
  var message = '';
  error_messages.forEach(function(value) {
    if (value.key === error) {
      message = value.message;
    }
  })
  return message;
}

var error_messages = [
  {  key: 'username_empty',
     message: 'usernameを入力して下さい'
  },
  {  key: 'username_irregal_chara',
    message: 'usernameに使える文字は英大小文字と-(ハイフン)です'
  },
  {  key: 'username_irregal_length',
    message: 'usernameは4から8文字です'
  },
  {  key: 'password_empty',
     message: 'Passwordを入力して下さい'
  },
  {  key: 'password_irregal_chara',
    message: 'Passwordに使える文字は英大小文字と-,+,!,@,#,*,&,^,%,~です'
  },
  {  key: 'password_irregal_length',
    message: 'Passwordは6から8文字です'
  }
];

if(typeof module === 'object') {
  module.exports.validation = validation;
}
