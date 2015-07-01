'use strict';
window.addEventListener('load', function() {
  let $login = document.getElementById('loginForm');
  let $errors = document.getElementById('errors');

  $login.addEventListener('submit', function(e) {
    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let params = {
      username: username,
      password: password
    };
    let error_messages = loginValidation(params);
    if(error_messages.length > 0) {
      e.preventDefault();
      for(let i = 0; i < error_messages.length; i++) {
        let $li = document.createElement('li');
        let $strong = document.createElement('strong');
        $strong.textContent = error_messages[i];
        $li.appendChild($strong);
        $errors.appendChild($li);
      }
    }
  });
});
