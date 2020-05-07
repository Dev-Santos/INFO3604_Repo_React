var Sequelize = require("sequelize");
const db = require('../config/database');

const Beneficiary = db.define('beneficiaries' , {
        company_id:{
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

module.exports = Beneficiary;