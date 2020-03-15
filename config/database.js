var Sequelize = require("sequelize");

var mode;

mode = 'dev';

if(mode == 'dev'){
  module.exports = new Sequelize('postgres://nwahogac:3vTo5mkRYc3EkTlNPCcZvkwOSe5jR6P0@drona.db.elephantsql.com:5432/nwahogac');
  /*module.exports = new Sequelize('system_db', 'dev_acc', 'password123', {
    host: 'localhost',
    dialect: 'postgres'
  });*/
}else{
  //module.exports = new Sequelize('postgres://fqknkkeohildyw:9f4233bcbcee9032aadc026fd149202dd3b5a62f3e16a7d45f754972a1b4c7be@ec2-23-22-156-110.compute-1.amazonaws.com:5432/d25ncrs4mufb9r');
}


