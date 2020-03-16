const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');

//@route    GET api/items
//@desc     Get all items
//@access   Public
router.get('/', (req, res)=>{
    Item.findAll({raw:true})
        .then(items =>{
            res.json(items);
        })
        .catch(err => console.log(err));
});

//@route    POST api/items
//@desc     Add an item
//@access   Private
router.post('/', auth ,(req, res) =>{

    const data = {name: req.body.name, date: Date.now()}
    let {name, date} = data;

    Item.create({name, date})
        .then(item => {
            console.log(JSON.stringify(item, null));
            res.json(item);
        })
        .catch(err => console.log(err));

});

//@route    DELETE api/items/:id
//@desc     Delete an item with a particular id
//@access   Private
router.delete('/:id', auth, (req, res) =>{

    Item.findByPk(req.params.id).then((item) => {
        item.destroy();
        res.json({success:true});
      }).catch(err => res.json({success:false}));
      
});

module.exports = router;