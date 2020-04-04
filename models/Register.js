var Sequelize = require("sequelize");
const db = require('../config/database');

const RegisterUser = db.define('registration' , {
        name:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.TEXT
        },
        clubID:{
            type: Sequelize.INTEGER
        },
        password:{
            type: Sequelize.TEXT
        },
        status:{
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false
    });

module.exports = RegisterUser;