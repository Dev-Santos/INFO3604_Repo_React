const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');//Authentication middleware

//Database connection - sequelize var
const db = require('../../config/database');

const { QueryTypes } = require('sequelize');

//EWasteReport Model
const EWasteReport = require('../../models/EWasteReport');

//@route    POST api/ereport
//@desc     Submit E-Waste Report details
//@access   Public
router.post('/', (req, res)=>{
    
    const { rep_person, email, description, location, classification ,image_url } = req.body;

    //Simple validation
    if( !rep_person || !email || !description || !location || !classification || !image_url){
        res.status(400).json('Please enter all fields');
    }else{

        //Create a record in the ewaste_reports table
        EWasteReport.create({ rep_person, email, description, location, classification, image_url, date: Date.now()})
            .then(ereport => {
                return res.status(200).json(ereport);//Return details of newly created record
            }).catch(err => {
                console.log(err);
                return res.status(500).json({ msg: 'Error in submitting EWaste Report'});
            });
    }

    
    
});

//@route    GET api/ereport/listing
//@desc     Get All E-Waste Reports
//@access   Private
router.get('/listing', auth, (req, res) => {

    //Pull all the e-waste reports in the database
    db.query("SELECT `id`, `rep_person`, `email`, `description`, `location`, `image_url`, `classification`, `date` FROM `ewaste_reports`;", { type: QueryTypes.SELECT})
        .then(ereports => {
            
            res.status(200).json(ereports);//Returns e-waste reports

        })
        .catch(err => res.status(500).json({msg : "Error in pulling the e-waste reports data"}));

})

module.exports = router;