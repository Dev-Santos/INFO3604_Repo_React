var Sequelize = require("sequelize");
const db = require('../config/database');

const Donor = db.define('donors' , {
        FirstName:{
            type: Sequelize.TEXT
        },
        LastName:{
            type: Sequelize.TEXT
        },
        Email:{
            type: Sequelize.TEXT
        },
        Phone:{
            type: Sequelize.TEXT,
        },
        password:{
            type: Sequelize.TEXT,
        },
        CompanyID:{
            type: Sequelize.INTEGER,
        },
        status:{
            type: Sequelize.INTEGER,
        },
        reg_date:{
            type: Sequelize.DATE,
        }

    },{
        timestamps: false
    });

module.exports = Donor;