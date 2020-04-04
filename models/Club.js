var Sequelize = require("sequelize");
const db = require('../config/database');

const Club = db.define('clubs' , {
        location:{
            type: Sequelize.TEXT
        },
        address	:{
            type: Sequelize.TEXT
        },
        mainContactId:{
            type: Sequelize.INTEGER
        },
        dateFormed:{
            type: Sequelize.DATE,
        }
    },{
        timestamps: false
    });

module.exports = Club;