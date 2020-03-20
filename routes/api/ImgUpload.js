const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const tf = require('@tensorflow/tfjs-node');

router.use(fileUpload());

router.post("/", (req, res) => {
    
    if(req.files == null){
        return res.status(400).json({ msg: 'No file' });
    }
    
    const file = req.files.file;

    //console.log(typeof file.data);
    
    //let tensor = tf.browser.fromPixels(file.data, 3);

    try {

        tf.loadGraphModel('file://routes/api/class_model/model.json')
        .then(model => {
            console.log('Model loaded successfully');
            //console.log(model);
            res.json({msg: 'Loading Model successful', fileName:file.name });
        })
        .catch(err => res.status(500).json({ msg: 'Loading Model unsuccessful' }));

    } catch (error) {
        res.status(500).json({ msg: 'Server side error!' });
    }

});

module.exports = router;