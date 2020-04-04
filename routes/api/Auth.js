const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');


//@route    POST api/auth
//@desc     Authenticate user
//@access   Public
router.post('/', (req, res)=>{
    //res.send('Register');
    const { email, password } = req.body;

    //Simple validation
    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //Checking for existing user
    User.findOne({ where: { email } })
        .then(user =>{
            
            if(!user) return res.status(400).json({ msg: 'User does not exists'}); 

            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'}); 

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
                });
            
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