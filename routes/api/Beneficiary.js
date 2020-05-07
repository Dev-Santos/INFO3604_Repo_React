const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');//Authentication middleware

const { QueryTypes } = require('sequelize');

//Database connection - sequelize var
const db = require('../../config/database');

//Company Model
const Company = require('../../models/Company');

//Beneficiary Model
const Beneficiary = require('../../models/Beneficiary');

//DonationRequest Model
const DonationRequest = require('../../models/DonationRequest');


//@route    GET api/beneficiary/listing
//@desc     Get all beneficiary registration records
//@access   Private
router.get('/listing', auth, (req, res) => {

    //Pull all the records in the merged beneficiaries and companies tables -> Capture company beneficiaries (with a status of 0)
    db.query("SELECT `companies`.`id`, `companies`.`CompanyName`, `companies`.`CompanyAddress`, `companies`.`CompanyWebsite`, `companies`.`CompanyEmail`, `companies`.`CompanyPhoneNumber`, `companies`.`MainContact`, `companies`.`ContactPosition`, `companies`.`ContactNumber`, `companies`.`reg_date`, `beneficiaries`.`id` AS ben_id, `beneficiaries`.`password` FROM `beneficiaries` INNER JOIN `companies` ON `beneficiaries`.`company_id` = `companies`.`id` WHERE `beneficiaries`.`status` = 0;", { type: QueryTypes.SELECT})
        .then(listing => {
            
            return res.status(200).json(listing);

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the beneficiary registration listing data"})});

});

//@route    GET api/beneficiary/auth
//@desc     Get all authenticated beneficiaries
//@access   Private
router.get('/auth', auth, (req, res) => {

    //Pull all the records in the merged beneficiaries and companies tables -> Capture company beneficiaries (with a status of 1)
    db.query("SELECT `companies`.`id`, `companies`.`CompanyName`, `companies`.`CompanyAddress`, `companies`.`CompanyWebsite`, `companies`.`CompanyEmail`, `companies`.`CompanyPhoneNumber`, `companies`.`MainContact`, `companies`.`ContactPosition`, `companies`.`ContactNumber`, `companies`.`reg_date`, `beneficiaries`.`id` AS ben_id, `beneficiaries`.`password` FROM `beneficiaries` INNER JOIN `companies` ON `beneficiaries`.`company_id` = `companies`.`id` WHERE `beneficiaries`.`status` = 1;", { type: QueryTypes.SELECT})
        .then(listing => {
            
            return res.status(200).json(listing);

        })
        .catch(err => { return res.status(500).json({msg : "Error in pulling the company donor listing data"})});

});


//@route    POST api/beneficiary/register
//@desc     Register a beneficiary
//@access   Public
router.post('/register', (req, res) => {

    //Extract neeeded fields from the request body
    const { comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password } = req.body;

    //Simple validation
    if( !comp_name || !comp_add || !comp_website ||!comp_email || !comp_tel || !comp_cp_fname || !comp_cp_lname || !comp_pos || !comp_cp_tel || !comp_cp_email || !password ){
        
        return res.status(400).json({msg: 'Please provide all fields'});

    }

    //Check if the company of the beneficiary already exists
    Company.findOne({where : sequelize.or( { CompanyName: comp_name}, {CompanyEmail: comp_email} ) })
    .then(company => {
        
        //Reject - don't want to have duplicate beneficiary companies
        if (company)
            return res.status(400).json({msg: 'Company Record Already Exists'});

        else{

            //Create company record in the companies table
            Company.create({CompanyName: comp_name, CompanyAddress: comp_add, CompanyWebsite: comp_website, CompanyEmail: comp_email, CompanyPhoneNumber: comp_tel, MainContact: comp_cp_fname + " " + comp_cp_lname, ContactPosition: comp_pos, ContactNumber: comp_cp_tel, reg_date: Date.now()})
                .then(new_company => {

                    //Hash the provided password
                    bcrypt.hash(password,13)
                    .then((hash)=>{

                        //Create beneficiary record in the beneficiaries table
                        Beneficiary.create({ company_id: new_company.id, password: hash, status: 0 })
                        .then( record => { return res.status(200).json(record); } )
                        .catch( err => { return res.status(500).json({msg: 'Error in creating beneficary record'}) ; } );

                    })
                    .catch(err => { return res.status(500).json({ msg: 'Error in hashing the password'});});;
                    

                })
                .catch(err => { return res.status(500).json({msg: 'Company record for beneficiary not created'}) ; });

        }
    });

});



//@route    POST api/beneficiary/update
//@desc     Update a beneficiary's registration status (based on the beneficiary id)
//@access   Private
router.post('/update', auth, (req, res)=>{
    
    //Extract id from request body
    const { id } = req.body;

    //If an id is present
    if(id){

        //Search the beneficiaries table using the provided record id
        Beneficiary.findOne({ where: { id } })
            .then( record => {
                
                if(record){

                    //If a record is found set their status to 1 (meaning the beneficiary is authenticated)
                    record.status = 1;
                    
                    //Update changes
                    record.save()
                        .then( record => { return res.status(200).json(record);})//Return details of updated beneficiary
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


//@route    POST api/beneficiary/request
//@desc     Submit a donation request form
//@access   Private
//router.post('/request', auth, (req, res)=>{
router.post('/request', (req, res)=>{
    
    //Extract neeeded fields from the request body
    const { name, request, quantity, reason, location } = req.body;

    //Simple validation
    if(!name || !request || !quantity || !reason || !location ){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    // Search for the id of the beneficiary that submitted the form
    db.query('SELECT  `beneficiaries`.`id` AS ben_id FROM `beneficiaries` INNER JOIN `companies` ON `beneficiaries`.`company_id` = `companies`.`id` WHERE `companies`.`CompanyName` = ? ;', { replacements: [name], type: QueryTypes.SELECT })
    .then(record => {
        
        //If a record is found
        if (record){

            //Create a donation request in the donation_requests table
            DonationRequest.create({ ben_id: record[0].ben_id, name, request, quantity, reason, status: 0, location, date: Date.now()})
            .then(newRecord => {
                return res.status(200).json(newRecord);
            })
            .catch(err => { return res.status(500).json({msg: 'Error in creating donation request record'}); })

           
        }else{
            return res.status(400).json({msg: 'No Benenficiary record exists'});
        }
        
    }).catch( err => { return res.status(500).json({msg: 'Error in pulling beneficiary data'});  });
    
});


//@route    GET api/beneficiary/requests
//@desc     Get all submitted donation requests
//@access   Private
router.get('/requests', auth, (req, res)=>{
    
    //Find all donation requests with a status of 0 (Pending)
    DonationRequest.findAll({where: {status: 0}})
    .then(listing => {

        return res.status(200).json(listing);

    })
    .catch(err => { return res.status(500).json({ msg: 'Error in pulling donation requests records' }); });
    
});


//@route    GET api/beneficiary/requests_auth
//@desc     Get all approved donation requests
//@access   Private
router.get('/requests_auth', auth, (req, res)=>{
    
        //Find all donation requests with a status of 1 (Approved)
        DonationRequest.findAll({where: {status: 1}})
        .then(listing => {
    
            return res.status(200).json(listing);
    
        })
        .catch(err => { return res.status(500).json({ msg: 'Error in pulling donation requests records' }); });
        
    });
    


//@route    POST api/beneficiary/request/update
//@desc     Approve a donation request (based on their donation request id)
//@access   Private
router.post('/request/update', auth, (req, res)=>{

    //Extract id field from the request body
    const { id } = req.body;

    //Simple validation
    if(!id)
        return res.status(400).json({ msg: 'Please enter all fields' });
    
    //Check to see if there is a donation request with the inputted id
    DonationRequest.findOne({ where: { id } })
        .then(record => {

            //If a record is found
            if(record){

                //If a record is found set their status to 1 (meaning the donation request is approved)
                record.status = 1;
                
                //Update changes
                record.save()
                    .then( record => { return res.status(200).json(record);})//Return details of updated donation request
                    .catch(err => { return res.status(400).json({msg: 'Record not saved'});});
                
            }else{
                return res.status(400).json({msg: 'Record does not exists'});
            }
        
        })
        .catch(err => { return res.status(500).json({msg: 'Error in accessing donation request records'}); });
    
});



module.exports = router;