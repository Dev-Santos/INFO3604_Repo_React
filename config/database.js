var Sequelize = require("sequelize");
const config = require('config');


//Actual DB Credentials in the default.json file

module.exports = new Sequelize(config.get('DB_NAME'), config.get('DB_USER'), config.get('DB_PASSWORD'), {
    host: config.get('DB_HOST'),
    dialect: 'mysql'
});


