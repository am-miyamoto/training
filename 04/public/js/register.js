'use strict';
window.addEventListener('load', function() {
  var $register = document.getElementById('registerForm');
  var $errors = document.getElementById('errors');

  $register.addEventListener('submit', function(e) {
    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm_password').value;
    var params = {
      username: username,
      password: password,
      confirm_password: confirm_password
    };
    var error_messages = registerValidation(params);
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
