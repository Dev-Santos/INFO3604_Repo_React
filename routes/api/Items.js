const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

router.get('/', (req, res)=>{
    Item.findAll({raw:true})
        .then(users =>{
            res.json(users);
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) =>{

    const data = {name: req.body.name, date: Date.now()}
    let {name, date} = data;

    Item.create({name, date})
        .then(user => {
            console.log(JSON.stringify(user, null));
            res.json(user);
        })
        .catch(err => console.log(err));

});

router.delete('/:id', (req, res) =>{

    Item.findByPk(req.params.id).then((item) => {
        item.destroy();
        res.json({success:true});
      }).catch(err => res.json({success:false}));
      
});

module.exports = router;