let Sequelize = require('sequelize')
  , config = require('config').database
  ;
let sequelize = null;

function getConnection() {
  if (!sequelize) {
    let options = {};
    options.host = config.host;
    if (config.logging === 'false') {
      options.logging = false;
    }
    sequelize = new Sequelize(config.dbname, config.username, config.password, options);
  }
  return sequelize;
}
module.exports.getConnection = getConnection;
