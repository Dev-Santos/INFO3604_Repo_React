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
                        { expiresIn: 1200 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({ token, user:
                                                {id: user.id, name: user.name, reg_date: user.reg_date}}
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
    .then(user => res.json(user));
});




module.exports = router;