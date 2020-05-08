const express = require('express');
const router = express.Router();
const sendMail = require('../../mail');

//@route    POST api/mail
//@desc     Send an email
//@access   Public
router.post('/', (req, res)=>{

    const { email, subject, text } = req.body;

    if( !email || !subject || !text ){
        return res.status(400).json({msg: "Please enter all fields" });
    }

    sendMail(email, subject, '<ul><li>subject</li></ul>', (err, data) => {
        if(err){
            return res.status(500).json({msg: 'Internal Server Error'});
        }else{
            return res.status(200).json({msg: 'Message sent'});
        }
    })

});


module.exports = router;