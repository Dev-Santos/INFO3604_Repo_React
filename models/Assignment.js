var Sequelize = require("sequelize");
const db = require('../config/database');

const Assignment = db.define('assignments' , {
        cm_id:{
            type: Sequelize.INTEGER
        },
        assignment_type_id:{
            type: Sequelize.INTEGER
        },
        record_id:{
            type: Sequelize.INTEGER
        },
        date:{
            type: Sequelize.DATE
        },
        reg_date:{
            type: Sequelize.DATE
        },
        status:{
            type: Sequelize.INTEGER
        },
        comments:{
            type: Sequelize.TEXT
        }
    },{
        timestamps: false
    });

module.exports = Assignment;