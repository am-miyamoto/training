'use strict';
window.addEventListener('load', function() {
  let $register = document.getElementById('registerForm');
  let $errors = document.getElementById('errors');

  $register.addEventListener('submit', function(e) {
    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value;
    let params = {
      username: username,
      password: password,
      confirm_password: confirm_password
    };
    let error_messages = registerValidation(params);
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
