var Sequelize = require("sequelize");
const db = require('../config/database');

const Item = db.define('items' , {
        name:{
            type: Sequelize.TEXT
        },
        date:{
            type: Sequelize.DATE,
        }
    },{
        timestamps: false
    });

module.exports = Item;