var Sequelize = require("sequelize");
const db = require('../config/database');

const Donation = db.define('donations' , {
        donor:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.TEXT
        },
        company:{
            type: Sequelize.NUMBER
        },
        item_type:{
            type: Sequelize.TEXT
        },
        item_desc:{
            type: Sequelize.TEXT
        },
        serial_no:{
            type: Sequelize.TEXT
        },
        units:{
            type: Sequelize.NUMBER
        },
        location:{
            type: Sequelize.TEXT
        },
        retrieval_loc:{
            type: Sequelize.TEXT,
        },
        image_url:{
            type: Sequelize.TEXT,
        },
        classification:{
            type: Sequelize.TEXT,
        },
        status:{
            type: Sequelize.INTEGER,
        },
        date:{
            type: Sequelize.DATE,
        },
        completed:{
            type: Sequelize.INTEGER,
        }
    },{
        timestamps: false
    });

module.exports = Donation;