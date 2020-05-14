const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');//Authentication middleware
const sendMail = require('../../mail');// Imported function to send mail

const { QueryTypes } = require('sequelize');

//Database connection - sequelize var
const db = require('../../config/database');

//Company Model
const Company = require('../../models/Company');

//Donor Model
const Donor = require('../../models/Donor');

//Donation Model
const Donation = require('../../models/Donation');

//@route    GET api/donor/listing
//@desc     Get all individual and company donor registration records
//@access   Private
router.get('/listing',auth, (req, res)=>{

    //Pull all the records in the merged donors and companies tables -> Capture company donor records information (with a status of 0)
    db.query("SELECT `companies`.`id`, `companies`.`CompanyName`, `companies`.`CompanyAddress`, `companies`.`CompanyWebsite`, `companies`.`CompanyEmail`, `companies`.`CompanyPhoneNumber`, `companies`.`MainContact`, `companies`.`ContactPosition`, `companies`.`ContactPosition`, `companies`.`ContactNumber`, `companies`.`reg_date`, `donors`.`id` AS donor_id, `donors`.`password` FROM `donors` INNER JOIN `companies` ON `donors`.`CompanyID` = `companies`.`id` WHERE `donors`.`status` = 0;", { type: QueryTypes.SELECT})
        .then(listing => {
            
            //Capture individual donor records information (with a status of 0)
            db.query("SELECT `id`, `FirstName`, `LastName`, `Email`, `Phone`, `CompanyID`, `reg_date`, `password` FROM `donors` WHERE `status`= 0 AND `CompanyID` IS NULL;", { type: QueryTypes.SELECT})
            .then(listing2 => {

                return res.status(200).json({comp: listing, ind: listing2});//Return all the records

            })
            .catch(err => { return res.status(500).json({msg : "Error in pulling the individual donor listing data"})});           

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the company donor listing data"})});
    
});


//@route    GET api/donor/auth
//@desc     Get all authenticated individual and company donors
//@access   Private
router.get('/auth', auth, (req, res)=>{

    //Pull all the records in the merged donors and companies tables -> Capture company donor records information (with a status of 1)
    db.query("SELECT `companies`.`id`, `companies`.`CompanyName`, `companies`.`CompanyAddress`, `companies`.`CompanyWebsite`, `companies`.`CompanyEmail`, `companies`.`CompanyPhoneNumber`, `companies`.`MainContact`, `companies`.`ContactPosition`, `companies`.`ContactPosition`, `companies`.`ContactNumber`, `companies`.`reg_date`, `donors`.`id` AS donor_id, `donors`.`password` FROM `donors` INNER JOIN `companies` ON `donors`.`CompanyID` = `companies`.`id` WHERE `donors`.`status` = 1;", { type: QueryTypes.SELECT})
        .then(listing => {

            //Capture individual donor records information (with a status of 1)
            db.query("SELECT `id`, `FirstName`, `LastName`, `Email`, `Phone`, `CompanyID`, `reg_date`, `password` FROM `donors` WHERE `status`= 1 AND `CompanyID` IS NULL;", { type: QueryTypes.SELECT})
            .then(listing2 => {

               return res.status(200).json({comp: listing, ind: listing2});//Return all the records

            })
            .catch(err => { return res.status(500).json({msg : "Error in pulling the individual donor listing data"});});            

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the company donor listing data"});});
    
});


//@route    POST api/donor/register
//@desc     Register a donor
//@access   Public
router.post('/register', (req, res) => {

    const { type } = req.body;

    //Simple validation
    if(!type){

        return res.status(400).json({msg: 'Please provide all fields'});

    }

    //If the user wanted to create an individual donor
    if( type === 'ind'){

        //Simple validation
        const { fname, lname, email, tel, password } = req.body;

        if(!fname || !lname || !email || !tel || !password){

            return res.status(400).json({msg: 'Please provide all fields'});            

        }

        //Check if the donor already exists
        Donor.findOne({where: {Email: email}})
            .then(record => {
                if (record)
                    return res.status(400).json({msg: 'Individual Donor Already Exists'});
                else{

                    //Hash their password
                    bcrypt.hash(password,13)
                    .then((hash)=>{

                        //Create a new donor record in the donors table
                        Donor.create({FirstName: fname, LastName: lname, Email: email, Phone: tel, password: hash, CompanyID: null, status: 0, reg_date: Date.now()})
                        .then(donor => {

                            //Send confirmation email
                            let subject = "Individual Donor Registration";

                            let text = "Your donor registration form has been submitted successfully"
                            
                            let html = `<p>Dear ${donor.FirstName} ${donor.LastName},</p>
                                        <strong>${text}</strong>
                                        <ul>
                                            <li>Email: ${donor.Email}</li>
                                            <li>Phone: ${donor.Phone}</li>
                                        </ul>
                                        <br/>
                                        Kind Regards,<br/>
                                        RSC.
                            `;

                            sendMail(donor.Email, subject, text, html);

                            return res.status(200).json(donor);//Return the newly created donor record

                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({ msg: 'Error in creating donor record'});
                        });
                        
                    }).catch(err => { return res.status(500).json({ msg: 'Error in hashing the password'}); });
                    
                }
            })
            .catch( err => { return res.status(500).json({msg: 'Error in finding Donor record'});} );

    }else if(type === 'comp'){ //If the user wanted to create a company donor
        
        const { comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password } = req.body;

        //Simple validation
        if( !comp_name || !comp_add || !comp_website ||!comp_email || !comp_tel || !comp_cp_fname || !comp_cp_lname || !comp_pos || !comp_cp_tel || !comp_cp_email || !password ){
         
            return res.status(400).json({msg: 'Please provide all fields'});

        }

        //Check if the company of the donor already exists
        Company.findOne({where : sequelize.or( { CompanyName: comp_name}, {CompanyEmail: comp_email} ) })
        .then(company => {
            if (company)
                return res.status(400).json({msg: 'Company Donor Already Exists'});
            else{

                //Create a new company record in the companies table
                Company.create({CompanyName: comp_name, CompanyAddress: comp_add, CompanyWebsite: comp_website, CompanyEmail: comp_email, CompanyPhoneNumber: comp_tel, MainContact: comp_cp_fname + " " + comp_cp_lname, ContactPosition: comp_pos, ContactNumber: comp_cp_tel, reg_date: Date.now()})
                    .then(new_company => {

                        //Send confirmation email
                        let subject = "Company Donor Registration";

                        let text = "Your donor registration form has been submitted successfully"
                        
                        let html = `<p>Dear ${new_company.CompanyName},</p>
                                    <strong>${text}</strong>
                                    <ul>
                                        <li>Company Email: ${new_company.CompanyEmail}</li>
                                        <li>Company Address: ${new_company.CompanyAddress}</li>
                                        <li>Company Website: ${new_company.CompanyWebsite}</li>
                                        <li>Company Phone Number: ${new_company.CompanyPhoneNumber}</li>
                                        <li>Main Contact: ${new_company.MainContact}</li>
                                    </ul>
                                    <br/>
                                    Kind Regards,<br/>
                                    RSC.
                                `;

                        sendMail(new_company.CompanyEmail, subject, text, html);

                        //Hash their password
                        bcrypt.hash(password,13)
                        .then((hash)=>{

                            //Create a new donor record in the donors table
                            Donor.create({FirstName: comp_cp_fname, LastName: comp_cp_lname, Email: comp_cp_email, Phone: comp_cp_tel, password: hash, CompanyID: new_company.id, status: 0, reg_date: Date.now()})
                                .then(donor => { return res.status(200).json(donor);})//Return the newly created donor record
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({ msg: 'Error in creating donor record'});
                                });
                        }).catch(err => { return res.status(500).json({ msg: 'Error in hashing the password'});});
                        
                    }).catch(err =>{
                        
                        console.log(err);
                        return res.status(500).json({ msg: 'Error in creating company record'});

                    });

            }
        })

    }else{

        return res.status(400).json({msg: 'Invalid donor type'});

    }

});


//@route    POST api/donor/update
//@desc     Update a donor's registration status
//@access   Private
router.post('/update', auth, (req, res)=>{
    
    const { id } = req.body;

    console.log(req.body);

    if(id){

        //Search the donors table using the provided record id
        Donor.findOne({ where: { id } })
            .then( record => {
                
                if(record){

                    //If a record is found set their status to 1 (meaning the donor is authenticated)
                    record.status = 1;
                    
                    //Update changes
                    record.save()
                        .then( record => { return res.status(200).json(record);})//Return details of updated donor
                        .catch(err => { return res.status(400).json({msg: 'Record not saved'});});
                    
                }else{
                    return res.status(400).json({msg: 'Record does not exists'});
                }

            })
            .catch(err => { return res.status(400).json({msg: 'Error in pulling the record data'});});

    }else{
        res.status(400).json({msg: 'Data not received!'});
    }

});



//@route    POST api/donor/donation
//@desc     Submit a donation form
//@access   Private
router.post('/donation', auth, (req, res)=>{
   
    const { donor, email, item_type, item_desc, serial_no, units, 
        location, retrieval_loc, image_url, classification,  } = req.body;

    //Simple validation        
    if( !donor || !email || !item_type || !item_desc || !serial_no || !units || !location || !retrieval_loc || !image_url 
        || !classification ){

            return res.status(400).json({msg: 'Please provide all fields'});

    }


    //Check to see if the donor is a company or an individual
    Company.findOne({ where: {CompanyName: donor}})
    .then(rec => {
        
        let val = 0;

        //If a record is found, that means it is a company donor
        if (rec)
            val = 1;
        
        //Create donation record in the donations table (database)
        Donation.create({ donor, email, company: val, item_type, item_desc, serial_no, units, location, retrieval_loc, image_url, classification, status: 0, date: Date.now(), completed: 0 })
            .then( donation => {
                
                //Send confirmation email
                let subject = "Donation Form Submission";

                let text = "Your donation form has been submitted successfully."

                let html = `<p>Dear ${donation.donor},</p>
                            <strong>${text}</strong>
                            <ul>
                                <li>Item Type: ${donation.item_type}</li>
                                <li>Item Description: ${donation.item_desc}</li>
                                <li>Serial Number: ${donation.serial_no}</li>
                                <li>Units: ${donation.units}</li>
                                <li>Retrieval Location: ${donation.retrieval_loc}</li>
                            </ul>
                            <br/>
                            Kind Regards,<br/>
                            RSC.
                        `;

                sendMail(donation.email, subject, text, html);

                return res.status(200).json(donation);//Return newly created record

            })
            .catch( err => {  return res.status(500).json({msg: 'Error in creating donor record'}); }); //If an error is caught

    })
    .catch( err =>{//If an error is caught
        return res.status(500).json({msg: 'Error in pulling company donor data'});
    });

});

//@route    GET api/donor/donations
//@desc     Get listing of submitted donations
//@access   Private
router.get('/donations', auth, (req, res)=>{
   
    //Pull all the donations (database) with a status of 0 (pending)
    db.query("SELECT * FROM `donations` WHERE `status` = 0;", { type: QueryTypes.SELECT})
        .then(listing => {

            return res.status(200).json(listing);//Return all the records

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the company donor listing data"});});//If an error is caught

});

//@route    GET api/donor/donations_auth
//@desc     Get listing of approved donations
//@access   Private
router.get('/donations_auth', auth, (req, res)=>{
   
    //Pull all the donations (database) with a status of 1 (approved)
    db.query("SELECT * FROM `donations` WHERE `status` = 1;", { type: QueryTypes.SELECT})
        .then(listing => {

            return res.status(200).json(listing);//Return all the records

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the company donor listing data"});});//If an error is caught

});



//@route    POST api/donor/donation/update
//@desc     Approve a donation (based on their donation id)
//@access   Private
router.post('/donation/update', auth, (req, res)=>{
   
    //Extract id field from the request body
    const { id } = req.body;

    //Simple validation
    if(!id)
        return res.status(400).json({ msg: 'Please enter all fields' });
    
    //Check to see if there is a donation with the inputted id
    Donation.findOne({ where: { id } })
        .then(record => {

            //If a record is found
            if(record){
                
                //Send confirmation email
                let subject = "Donation Approval";

                let text = "Your donation (with the following details) has been approved by RSC."

                let html = `<p>Dear ${record.donor},</p>
                            <strong>${text}</strong>
                            <ul>
                                <li>Item Type: ${record.item_type}</li>
                                <li>Item Description: ${record.item_desc}</li>
                                <li>Serial Number: ${record.serial_no}</li>
                                <li>Units: ${record.units}</li>
                                <li>Retrieval Location: ${record.retrieval_loc}</li>
                            </ul>
                            <p>You will be contacted in the coming days to confirm pickup details.<p><br/>
                            Kind Regards,<br/>
                            RSC.
                        `;

                sendMail(record.email, subject, text, html); 

                //If a record is found set their status to 1 (meaning the donation is approved)
                record.status = 1;
                
                //Update changes
                record.save()
                    .then( record => {                                 
                        return res.status(200).json(record);//Return details of updated donation
                    })
                    .catch(err => { return res.status(400).json({msg: 'Record not saved'});});
                
            }else{
                return res.status(400).json({msg: 'Record does not exists'});
            }
        
        })
        .catch(err => { return res.status(500).json({msg: 'Error in accessing donation records'}); });

});

module.exports = router;