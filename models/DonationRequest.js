var Sequelize = require("sequelize");
const db = require('../config/database');

const DonationRequest = db.define('donation_requests' , {
        ben_id:{
            type: Sequelize.INTEGER
        },
        name:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.TEXT
        },
        request:{
            type: Sequelize.TEXT
        },
        quantity:{
            type: Sequelize.INTEGER
        },
        reason:{
            type: Sequelize.TEXT
        },
        status:{
            type: Sequelize.INTEGER
        },
        location:{
            type: Sequelize.TEXT
        },
        date:{
            type: Sequelize.DATE,
        }
    },{
        timestamps: false
    });

module.exports = DonationRequest;