
window.addEventListener('load', function() {
  var $login = document.getElementById('loginForm');

  $login.addEventListener('submit', function(e) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username, password);

    if (username === '' || password === '') {
      e.preventDefault();
      var $errors = document.getElementById('errors');

      $errors.removeChild();

      if (!username) {
        var $li = document.createElement('li');
        var $strong = document.createElement('strong');
        $strong.textContent = "username is empty"
        $li.appendChild($strong);
        $errors.appendChild($li);
      }

      if (!password){
        var $li = document.createElement('li');
        var $strong = document.createElement('strong');
        $strong.textContent = "password is empty"
        $li.appendChild($strong);
        $errors.appendChild($li);
      }
    }
  });
});
