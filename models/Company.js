var Sequelize = require("sequelize");
const db = require('../config/database');

const Company = db.define('companies' , {
        CompanyName:{
            type: Sequelize.TEXT
        },
        CompanyAddress:{
            type: Sequelize.TEXT
        },
        CompanyWebsite:{
            type: Sequelize.TEXT
        },
        CompanyEmail:{
            type: Sequelize.TEXT
        },
        CompanyPhoneNumber:{
            type: Sequelize.TEXT
        },
        MainContact:{
            type: Sequelize.TEXT
        },
        ContactPosition:{
            type: Sequelize.TEXT
        },
        ContactNumber:{
            type: Sequelize.TEXT,
        },
        reg_date:{
            type: Sequelize.DATE,
        }
    },{
        timestamps: false
    });

module.exports = Company;