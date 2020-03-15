var Sequelize = require("sequelize");
const db = require('../config/database');

const User = db.define('users' , {
        name:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.TEXT
        },
        password:{
            type: Sequelize.TEXT
        },
        reg_date:{
            type: Sequelize.DATE,
        }
    },{
        timestamps: false
    });

module.exports = User;