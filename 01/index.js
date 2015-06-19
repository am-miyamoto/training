'use strict';

window.onload = function() {
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var login = document.getElementById('btn_login');
  var message = document.getElementById('message');
  
  username.addEventListener('input', function() {
    // alert('user:'+username.value);
    message.value = username.value;

  });
  password.addEventListener('input', function() {
    alert('password:'+password.value);

  });

  login.addEventListener('click', function(){
    // validate username and password
    if(username.value.match('/\l/')){
      message.value = 'true';
    }else{
      message.value = 'false';
    }

    alert('user:'+username.value);
    alert('PAS:'+password.value);
  });
};
