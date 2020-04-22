const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');//Authentication middleware

const { QueryTypes } = require('sequelize');

//Database connection - sequelize var
const db = require('../../config/database');

//Company Model
const Company = require('../../models/Company');

//Donor Model
const Donor = require('../../models/Donor');

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

                res.status(200).json({comp: listing, ind: listing2});//Return all the records

            })
            .catch(err => res.status(500).json({msg : "Error in pulling the individual donor listing data"}));           

        })
        .catch(err => res.status(500).json({msg : "Error in pulling the company donor listing data"}));
    
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

                res.status(200).json({comp: listing, ind: listing2});//Return all the records

            })
            .catch(err => res.status(500).json({msg : "Error in pulling the individual donor listing data"}));            

        })
        .catch(err => res.status(500).json({msg : "Error in pulling the company donor listing data"}));
    
});


//@route    POST api/donor/register
//@desc     Register a donor
//@access   Public
router.post('/register', (req, res) => {

    const { type } = req.body;

    //Simple validation
    if(!type){

        res.status(400).json({msg: 'Please provide all fields'});

    }

    //If the user wanted to create an individual donor
    if( type === 'ind'){

        //Simple validation
        const { fname, lname, email, tel, password } = req.body;

        if(!fname || !lname || !email || !tel || !password){

            res.status(400).json({msg: 'Please provide all fields'});            

        }

        //Check if the donor already exists
        Donor.findOne({where: {Email: email}})
            .then(record => {
                if (record)
                    res.status(400).json({msg: 'Individual Donor Already Exists'});
                else{

                    //Hash their password
                    bcrypt.hash(password,13)
                    .then((hash)=>{

                        //Create a new donor record in the donors table
                        Donor.create({FirstName: fname, LastName: lname, Email: email, Phone: tel, password: hash, CompanyID: null, status: 0, reg_date: Date.now()})
                        .then(donor => res.status(200).json(donor))//Return the newly created donor record
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({ msg: 'Error in creating donor record'});
                        });
                        
                    }).catch(err => res.status(500).json({ msg: 'Error in hashing the password'}));
                    
                }
            })
            .catch( err => res.status(500).json({msg: 'Error in finding Donor record'}));

    }else if(type === 'comp'){ //If the user wanted to create a company donor
        
        const { comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password } = req.body;

        //Simple validation
        if( !comp_name || !comp_add || !comp_website ||!comp_email || !comp_tel || !comp_cp_fname || !comp_cp_lname || !comp_pos || !comp_cp_tel || !comp_cp_email || !password ){
         
            res.status(400).json({msg: 'Please provide all fields'});

        }

        //Check if the company of the donor already exists
        Company.findOne({where : sequelize.or( { CompanyName: comp_name}, {CompanyEmail: comp_email} ) })
        .then(company => {
            if (company)
                res.status(400).json({msg: 'Company Donor Already Exists'});
            else{

                //Create a new company record in the companies table
                Company.create({CompanyName: comp_name, CompanyAddress: comp_add, CompanyWebsite: comp_website, CompanyEmail: comp_email, CompanyPhoneNumber: comp_tel, MainContact: comp_cp_fname + " " + comp_cp_lname, ContactPosition: comp_pos, ContactNumber: comp_cp_tel, reg_date: Date.now()})
                    .then(new_company => {

                        //Hash their password
                        bcrypt.hash(password,13)
                        .then((hash)=>{

                            //Create a new donor record in the donors table
                            Donor.create({FirstName: comp_cp_fname, LastName: comp_cp_lname, Email: comp_cp_email, Phone: comp_cp_tel, password: hash, CompanyID: new_company.id, status: 0, reg_date: Date.now()})
                                .then(donor => res.status(200).json(donor))//Return the newly created donor record
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({ msg: 'Error in creating donor record'});
                                });
                        }).catch(err => res.status(500).json({ msg: 'Error in hashing the password'}));
                        
                    }).catch(err =>{
                        
                        console.log(err);
                        return res.status(500).json({ msg: 'Error in creating company record'});

                    });

            }
        })

    }else{

        res.status(400).json({msg: 'Invalid donor type'});

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

                    //If a record is found set their status to 1 (meaning the donor is authenticated) and block out their password
                    record.status = 1;
                    record.password = "********";
                    
                    //Update changes
                    record.save()
                        .then( record => res.status(200).json(record))//Return details of updated donor
                        .catch(err => res.status(400).json({msg: 'Record not saved'}));
                    
                }else{
                    res.status(400).json({msg: 'Record does not exists'});
                }

            })
            .catch(err => res.status(400).json({msg: 'Error in pulling the record data'}));

    }else{
        res.status(400).json({msg: 'Data not received!'});
    }

});

module.exports = router;