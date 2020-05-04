const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');

// RegisterUser Model
const RegisterUser = require('../../models/Register');

// Donor Model
const Donor = require('../../models/Donor');

// Company Model
const Company = require('../../models/Company');

//@route    POST api/auth
//@desc     Authenticate user
//@access   Public
router.post('/', (req, res)=>{

    const { email, password } = req.body;

    //Simple validation
    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //Checking for existing user
    User.findOne({ where: { email } })
        .then(user =>{

            //If a user is found
            if(user){

                 //Validate password
                bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'}); 

                    //Checks if the user to be logged in is a donor
                    if(user.userType == 4){
                        
                        //Check to see if it is a company or an individual donor
                        Company.findOne({ where:{CompanyEmail: email}, attributes: { include: ['id'] }})
                        .then(record => {
                                
                                let val = null;

                                //If a record is found store their assigned donor id
                                if (record)
                                    val = record.id;
                                else
                                    val = -1;

                                //Create token for session
                                jwt.sign(
                                    {id: user.id},
                                    config.get('SECRET_KEY'),
                                    { expiresIn: 3600 },//A token expires in an hour
                                    (err, token) => {
                                        if(err) throw err;
                                        res.json({ token, user:
                                                            {id: user.id, name: user.name, userType: user.userType ,reg_date: user.reg_date, comp_id: val}}//Return token and the authenticated user details
                                                );
                                    }
                                )
                                
                            })    
                        .catch(err => res.status(500).json({msg : "Error in pulling  and/or sending the company donor data"}));            
                    
                    }else{// Otherwise, for the other types of users

                        //Create token for session
                        jwt.sign(
                            {id: user.id},
                            config.get('SECRET_KEY'),
                            { expiresIn: 3600 },//A token expires in an hour
                            (err, token) => {
                                if(err) throw err;
                                res.json({ token, user:
                                                    {id: user.id, name: user.name, userType: user.userType ,reg_date: user.reg_date}}//Return token and the authenticated user details
                                        );
                            }
                        )
                    }
                });
            }

            // Else, if a user is not found, check to see if their account is pending approval
            else{

                // Check for a pending club member account
                RegisterUser.findOne({ where: { email, status: 0 } })
                    .then( reg_user => {

                        //If a user registration record is found with a status = 0 (pending)
                        if (reg_user){
                            return res.status(400).json({ msg: 'User account stil awaiting approval'});
                        }else{

                            // Check for a pending donor account
                            Donor.findOne({ where: { email, status: 0 } })
                                .then( reg_donor => {

                                    //If a donor registration record is found with a status = 0 (pending)
                                    if (reg_donor){
                                        return res.status(400).json({ msg: 'Donor account stil awaiting approval'});
                                    }else{

                                        //Check to see if it is a company donor
                                        Company.findOne({ where:{CompanyEmail: email}})
                                            .then(comp_rec => {

                                                //If a company record is found
                                                if (comp_rec){

                                                    return res.status(400).json({ msg: 'Donor account stil awaiting approval'});

                                                }else{

                                                    return res.status(400).json({ msg: 'User does not exists'}); 

                                                }
                                                    
                                            });
                                    }
                                });

                        }

                    });
            }
            
        });
});



//@route    GET api/auth/user
//@desc     Get user data
//@access   Private
router.get('/user', auth, (req, res) =>{
    User.findOne({
        where: { id:req.user.id },
        attributes: { exclude: ['password'] } 
    })
    .then(user => res.json(user))//Return user details
    .catch(err => res.status(500).json({msg: 'User not found'}));
});



//@route    GET api/auth/users
//@desc     Get all users
//@access   Private
router.get('/users', auth, (req, res) =>{
    User.findAll()
    .then(users => res.status(200).json(users))//Return users details
    .catch(err => res.status(500).json({msg: 'Error in pulling the user data'}));
});


module.exports = router;