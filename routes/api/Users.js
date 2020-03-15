const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require('../../models/User');

router.post('/', (req, res)=>{
    //res.send('Register');
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
                        .then(user => res.json({ name: user.name, reg_date: user.reg_date}))
                        .catch(err => console.log(err));

                }).catch(err => console.log(err));
        });
});


module.exports = router;