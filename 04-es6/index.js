// test
let app = require('./src').app;

app.listen(3000, (err) => {
  if(!err) {
    console.log('start server at 3000 port');
  }
});
