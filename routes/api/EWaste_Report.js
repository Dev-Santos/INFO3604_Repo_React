const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');//Authentication middleware
const sendMail = require('../../mail');// Imported function to send mail

//Database connection - sequelize var
const db = require('../../config/database');

const { QueryTypes } = require('sequelize');

//EWasteReport Model
const EWasteReport = require('../../models/EWasteReport');

//@route    POST api/ereport
//@desc     Submit E-Waste Report details
//@access   Public
router.post('/', (req, res)=>{
    
    const { rep_person, email, telephone, description, location, classification ,image_url } = req.body;

    //Simple validation
    if( !rep_person || !email || !telephone || !description || !location || !classification || !image_url){
        res.status(400).json('Please enter all fields');
    }else{

        //Create a record in the ewaste_reports table
        EWasteReport.create({ rep_person, email, telephone, description, location, classification, image_url, date: Date.now()})
            .then(ereport => {
                
                //Send confirmation email
                let subject = "E-Waste Report Submission ";

                let text = "Your e-waste report has been submitted sucessfully."

                let html = `<p>Dear ${ereport.rep_person},</p>
                            <strong>${text}</strong>
                            <ul>
                                <li>Telephone Contact: ${ereport.telephone}</li>
                                <li>E-Waste description: ${ereport.description}</li>
                                <li>Location: ${ereport.location}</li>
                            </ul>
                            <p>You will be contacted in the coming days to confirm details for collection.<p><br/>
                            Kind Regards,<br/>
                            RSC.
                        `;
                
                sendMail(ereport.email, subject, text, html); 

                return res.status(200).json(ereport);//Return details of newly created record

            }).catch(err => {
                console.log(err);
                return res.status(500).json({ msg: 'Error in submitting EWaste Report'});
            });
    }

    
    
});

//@route    GET api/ereport/listing
//@desc     Get All pending E-Waste Reports
//@access   Public
//router.get('/listing', auth, (req, res) => {
router.get('/listing', (req, res) => {
    
    //Pull all the e-waste reports in the database
    db.query("SELECT `id`, `rep_person`, `email`, `telephone`, `description`, `location`, `image_url`, `classification`, `date`, `completed` FROM `ewaste_reports` WHERE `completed` = 0;", { type: QueryTypes.SELECT})
        .then(ereports => {
            
            res.status(200).json(ereports);//Returns e-waste reports

        })
        .catch(err => res.status(500).json({msg : "Error in pulling the e-waste reports data"}));

});

//@route    GET api/ereport/listing_comp
//@desc     Get All completed E-Waste Reports
//@access   Public
//router.get('/listing_comp', auth, (req, res) => {
router.get('/listing_comp', (req, res) => {
    
    //Pull all the e-waste reports in the database
    db.query("SELECT `id`, `rep_person`, `email`, `telephone`, `description`, `location`, `image_url`, `classification`, `date`, `completed` FROM `ewaste_reports` WHERE `completed` = 1;", { type: QueryTypes.SELECT})
        .then(ereports => {
            
            res.status(200).json(ereports);//Returns e-waste reports

        })
        .catch(err => res.status(500).json({msg : "Error in pulling the e-waste reports data"}));

});


//@route    POST api/ereport/update
//@desc     Indicate an e-waste report as completed (based on the report id)
//@access   Private
router.post('/update', auth, (req, res)=>{
   
    //Extract id field from the request body
    const { id } = req.body;

    //Simple validation
    if(!id)
        return res.status(400).json({ msg: 'Please enter all fields' });
    
    //Check to see if there is an e-waste report with the inputted id
    EWasteReport.findOne({ where: { id } })
        .then(record => {

            //If a record is found
            if(record){

                //Indicate the report to be completed
                record.completed = 1;
                
                //Save changes
                record.save()
                    .then( record => {                                 
                        return res.status(200).json(record);//Return details of updated e-waste report
                    })
                    .catch(err => { return res.status(400).json({msg: 'Record not saved'});});

            }else{
                return res.status(400).json({msg: 'Record does not exists'});
            }
        })
        .catch(err => { return res.status(500).json({msg: 'Error in accessing e-waste reports'}); });

});

module.exports = router;