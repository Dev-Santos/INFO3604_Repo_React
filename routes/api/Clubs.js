const express = require('express');
const router = express.Router();

//Club Model
const Club = require('../../models/Club');

//@route    GET api/clubs
//@desc     Select all club information
//@access   Public
router.get('/', (req, res)=>{
    
    Club.findAll({attributes: ['id','location']})
    .then(clubs =>{
        //console.log(clubs);
        res.status(200).json(clubs);//Return all club information
    }

    ).catch(err => res.status(500).json({msg : "Error in pulling the club data"}));

});


module.exports = router;