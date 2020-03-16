const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//User Model
const User = require('../../models/User');


//@route    POST api/users
//@desc     Register new user
//@access   Public
router.post('/', (req, res)=>{
    
    const { name, email, password } = req.body;

    //Simple validation
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //Checking for existing user
    User.findOne({ where: { email } })
        .then(user =>{
            
            if(user) return res.status(400).json({ msg: 'User already exists'}); 
            
            const newUser = {
                name,
                email,
                password,
                reg_date: Date.now()
            }

            bcrypt.hash(password,13)
                .then((hash)=>{
                    
                    newUser.password = hash;
                    
                    let {name, email, password , reg_date} = newUser;
                
                    User.create({name, email, password, reg_date})
                        .then(user => 
                                
                            jwt.sign(
                                {id: user.id},
                                config.get('SECRET_KEY'),
                                { expiresIn: 1200 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({ token, id: user.id, name: user.name, reg_date: user.reg_date});
                                }
                            )
                        )
                }).catch(err => console.log(err));
        });
});


module.exports = router;