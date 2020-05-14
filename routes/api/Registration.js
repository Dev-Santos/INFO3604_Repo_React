const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');//Authentication middleware
const sendMail = require('../../mail');// Imported function to send mail

const { QueryTypes } = require('sequelize');

//Database connection - sequelize var
const db = require('../../config/database');

//User Model
const User = require('../../models/User');

//RegisterUser Model
const Register = require('../../models/Register');

//@route    POST api/register
//@desc     Register new user
//@access   Public
router.post('/', (req, res)=>{
    
    const { name, email, clubID, password  } = req.body;

    console.log(req.body);

    //Simple validation
    if(!name || !email || !clubID || !password){
        console.log('Please enter all fields');
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    
    User.findOne({ where: { email } })
        .then(user =>{

            //Ensure that a user with the provided email does not exists
            if(user)  return res.status(400).json({ msg: 'User already exists'});
            
            //Hash their password
            bcrypt.hash(password,13)
                .then((hash)=>{
       
                    //Create a record in the registrations table
                    Register.create({name, email, clubID, password: hash, status: 0})
                    .then(register => {

                        //Send confirmation email
                        let subject = "Club Member Registration";

                        let text = "Your club member registration form has been submitted successfully"
                        
                        let html = `<p>Dear ${register.name},</p>
                                    <strong>${text}</strong>
                                    <ul>
                                        <li>Name: ${register.name}</li>
                                        <li>Email: ${register.email}</li>
                                    </ul>
                                    <br/>
                                    Kind Regards,<br/>
                                    RSC.
                        `;

                        sendMail(register.email, subject, text, html);
                        
                        return res.status(200).json(register);//Return details of newly created record

                        
                    }).catch(err => {
                        return res.status(500).json({ msg: 'Error in registering user'});
                    });    
                    
                }).catch(err => res.status(500).json({ msg: 'Error in hashing the password'}));

            
        }).catch(err => {
            
            return res.status(500).json({ msg: 'Error in searching for user'});
        });
});



//@route    GET api/register/listing
//@desc     Get club member registration listing
//@access   Private
router.get('/listing', auth, (req, res)=>{

    //Pull all the records in the registrations table with a status of 0
    db.query("SELECT `registrations`.`id`, `registrations`.`name`, `registrations`.`email`, `registrations`.`clubID` ,`registrations`.`password` ,`clubs`.`location`, `clubs`.`address`, `registrations`.`status`  FROM `registrations` INNER JOIN `clubs` ON `registrations`.`clubID` = `clubs`.`id` WHERE `registrations`.`status` = 0;", { type: QueryTypes.SELECT})
        .then(listing => {
            
            res.status(200).json(listing);//Return registration records
        })
        .catch(err => res.status(500).json({msg : "Error in pulling the register listing data"}));

});



//@route    GET api/register/auth_users
//@desc     Get authenticated club members in the users table
//@access   Private
router.get('/auth_users', auth, (req, res)=>{

    User.findAll({where: {userType: 2}}) //Club Members have a userType of 2
        .then( records => {

           return res.status(200).json(records); //Record corresponding records

        })
        .catch( err => { return res.status(500).json({ msg: 'Error in pulling user records'}); });


});

//@route    GET api/register/auth
//@desc     Get authenticated club members
//@access   Private
router.get('/auth', auth, (req, res)=>{

    //Pull all the records in the registrations table with a status of 1
    db.query("SELECT `registrations`.`id`, `registrations`.`name`, `registrations`.`email`, `registrations`.`clubID` ,`registrations`.`password` ,`clubs`.`location`, `clubs`.`address`, `registrations`.`status`  FROM `registrations` INNER JOIN `clubs` ON `registrations`.`clubID` = `clubs`.`id` WHERE `registrations`.`status` = 1;", { type: QueryTypes.SELECT})
        .then(listing => {
            
            res.status(200).json(listing);//Return registration records
        })
        .catch(err => res.status(500).json({msg : "Error in pulling the register listing data"}));

});



//@route    POST api/register/update
//@desc     Update a user's registration status
//@access   Private
router.post('/update', auth, (req, res)=>{

    const { id } = req.body;
    if(id){

        //Search the registrations table using the provided record
        Register.findOne({ where: { id } })
            .then( record => {
                
                if(record){

                    //If a record is found set their status to 1 (meaning the user is authenticated)
                    record.status = 1;
                    
                    //Update changes
                    record.save()
                        .then( record => res.status(200).json(record))//Return details of newly created user
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



//@route    POST api/register/user
//@desc     Create a new user account
//@access   Public
router.post('/user', (req, res)=>{
    
    const { name, email, password, clubID, userType } = req.body;

    //Simple validation
    if(!name || !email || !password || !clubID || !userType ){
        console.log('Error');
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //If the user to be created to does not have a clubID (e.g. donors, beneficiaries)
    if(parseInt(clubID) == -1){
   
        //Checking for existing user
        User.findOne({ where: { email } })
        .then(user =>{
            
            if(user) {return res.status(400).json({ msg: 'User already exists'});}
            
            //Create record in the users table
            User.create({name, email, password, reg_date: Date.now(), userType})
                .then(new_user => {     
         
                    //Send confirmation email
                    let subject = "Account Authentication";

                    let text = "Your account credentials has been authenticated."
                    
                    let html = `<p>Dear ${new_user.name},</p>
                                <strong>${text}</strong><br/>
                                <p>You can now login into the system using your account.</p>
                                <br/>
                                Kind Regards,<br/>
                                RSC.
                    `;

                    sendMail(new_user.email, subject, text, html);

                    res.status(200).json(new_user);//Return user details

                }).catch(err => {
                    
                    console.log(err);
                    res.status(500).json({msg: 'Error in creating a user'});//If an error is caught

                });

        });

    }else{

        //Checking for existing user
        User.findOne({ where: { email } })
        .then(user =>{
            
            if(user) return res.status(400).json({ msg: 'User already exists'});
            
            //Create record in the users table
            User.create({name, email, password, reg_date: Date.now(), userType, clubID})
                .then(user => {     
                    
                    //Send confirmation email
                    let subject = "Account Authentication";

                    let text = "Your account credentials has been authenticated."
                    
                    let html = `<p>Dear ${user.name},</p>
                                <strong>${text}</strong><br/>
                                <p>You can now login into the system using your account.</p>
                                <br/>
                                Kind Regards,<br/>
                                RSC.
                    `;

                    sendMail(user.email, subject, text, html);

                    res.status(200).json(user);//Return user details

                }).catch(err => {
                    
                    console.log(err);
                    res.status(500).json({msg: 'Error in creating a user'});//If an error is caught

                });

        });

    }

    
});



//@route    POST api/register/users/admin (Create Admin user without approval - Initial)
//@desc     Register new Admin user
//@access   Public
router.post('/user/admin', (req, res)=>{
    
    const { name, email, password, clubID } = req.body;

    //Simple validation
    if(!name || !email || !password || !clubID){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //Checking for existing user
    User.findOne({ where: { email } })
        .then(user =>{
            
            if(user) return res.status(400).json({ msg: 'User already exists'}); 
            
            //Construct user object
            const newUser = {
                name,
                email,
                password,
                reg_date: Date.now(),
                userType: 1, // A Club Executive user has a userType of 1
                clubID
            }

            //Hash their password
            bcrypt.hash(password,13)
                .then((hash)=>{
                    
                    newUser.password = hash;
                    
                    let {name, email, password , reg_date, userType, clubID} = newUser;
                
                    User.create({name, email, password, reg_date, userType, clubID})
                        .then(user => 
                                
                            //Generate security token
                            jwt.sign(
                                {id: user.id},
                                config.get('SECRET_KEY'),
                                { expiresIn: 1200 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({ token, id: user.id, name: user.name, reg_date: user.reg_date, userType: user.userType, clubID: user.clubID});//Return token and user details
                                }
                            )
                        )
                }).catch(err => console.log(err));
        });
});

module.exports = router;