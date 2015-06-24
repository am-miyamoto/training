// User

// Constuctor
// x User()
// o new User()
function User(name) {
  this.name = name;
}

// method
User.prototype.hello = function() {
  console.log('Hello! I\'m ' + this.name );
};

var soneda = new User('soneda');
console.log(soneda);

var nagase = new User('nagase');
console.log(nagase);
nagase.hello();
