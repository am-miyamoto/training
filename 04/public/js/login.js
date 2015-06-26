'use strict';
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
