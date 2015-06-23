/**
 * params.username と Password を受け取り
 * 正しいフォーマットかチェックする。
 *
 * 正しい場合：空の配列
 * 正しくない場合：メッセージを入れた配列を返す
 */
function validation(params) {
  var errors = [];
  if (!params.username) {
    errors.push('usernameを入力して下さい');
  } else {
    if (params.username.length < 2 || params.username.length > 8) {
      errors.push('usernameは2から8文字です');
    }
    if (params.username.match(/[^(a-z\-)]/)) {
      errors.push('usernameに使える文字は英小文字と-(ハイフン)です');
    }
  }

  if (!params.password) {
    errors.push('Passwordを入力して下さい');
  } else {
    if (params.password.length < 6 || params.password.length > 24) {
      errors.push('Passwordは6から24文字です');
    }
    if (params.password.match(/[^(a-zA-z\-\+!@)]/)) {
      // errors.push('Passwordに使える文字は英小大文字と-,+,!,@です');
      errors.push(setErrorMessage('password_irregal_length'));
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
    message: 'usernameに使える文字は英小文字と-(ハイフン)です'
  },
  {  key: 'username_irregal_length',
    message: 'usernameは2から8文字です'
  },
  {  key: 'password_empty',
     message: 'Passwordを入力して下さい'
  },
  {  key: 'password_irregal_chara',
    message: 'Passwordは6から24文字です'
  },
  {  key: 'password_irregal_length',
    message: 'Passwordに使える文字は英小大文字と-,+,!,@です'
  }
];
