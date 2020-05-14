var Sequelize = require("sequelize");
const db = require('../config/database');

const EWasteReport = db.define('ewaste_reports' , {
        rep_person:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.TEXT
        },
        telephone:{
            type: Sequelize.TEXT
        },
        description:{
            type: Sequelize.TEXT
        },
        location:{
            type: Sequelize.TEXT,
        },
        image_url:{
            type: Sequelize.TEXT,
        },
        classification:{
            type: Sequelize.TEXT,
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

module.exports = EWasteReport;