var Sequelize = require('sequelize')
  , config = require('config').database
  ;
var sequelize = null;

function getConnection() {
  if (!sequelize) {
    var options = {};
    options.host = config.host;
    if (config.logging === 'false') {
      options.logging = false;
    }
    sequelize = new Sequelize(config.dbname, config.username, config.password, options);
  }
  return sequelize;
}
module.exports.getConnection = getConnection;
