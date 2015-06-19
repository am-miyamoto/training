'use strict';

window.onload = function() {
  var username = document.getElementsByName('username')[0];
  var password = document.getElementsByName('password')[0];
  var login = document.getElementById('btn_login');
  var message = document.getElementById('message');

  login.addEventListener('click', function(e) {
    try {
      if(username.value.length < 2 || username.value.length > 8)
        throw 'usernameは2～8文字です';

      if(username.value.match(/[^(a-z|\-)]/))
        throw 'usernameに使える文字は英小文字と-(ハイフン)です';

      if(password.value.length < 6 || password.value.length > 24)
        throw 'passwordは6～24文字です';

      if(password.value.match(/[^(a-zA-z|\-|\+|\!|\@)]/))
        throw 'passwordに使える文字は英小大文字と-,+,!,@です';

　　　message.value = '';

    } catch(err) {
      message.value = err;
      e.preventDefault();
    }
  });
};
