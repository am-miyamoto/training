
window.addEventListener('load', function() {
  var $login = document.getElementById('loginForm');

  $login.addEventListener('submit', function(e) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username, password);

    if (username === '' || password === '') {
      e.preventDefault();
      var $username_error = document.getElementById('username_error');
      var $password_error = document.getElementById('password_error');
      $username_error.textContent = '';
      $password_error.textContent = '';

      if (!username)
        $username_error.textContent = 'username is empty';

      if (!password)
        $password_error.textContent = 'password is empty';
    }
  });
});
