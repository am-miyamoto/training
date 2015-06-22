'use strict';

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
      errors.push('Passwordに使える文字は英小大文字と-,+,!,@です');
    }
  }
  return errors;
}

window.addEventListener('load', function() {
  var $login = document.getElementById('loginForm');
  var $errors = document.getElementById('errors');

  $login.addEventListener('submit', function(e) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var params = {
      username: username,
      password: password
    };

    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    var error_messages = validation(params);
    if(error_messages.length > 0) {
      e.preventDefault();
      for(var i = 0; i < error_messages.length; i++) {
        var $li = document.createElement('li');
        var $strong = document.createElement('strong');
        $strong.textContent = error_messages[i];
        $li.appendChild($strong);
        $errors.appendChild($li);
      }
    }
  });
});
