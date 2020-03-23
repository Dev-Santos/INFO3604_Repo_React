const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const { Image, createCanvas } = require('canvas');

router.use(fileUpload());
router.use(express.json());

router.post("/", (req, res) => {

    if(req.files == null)
        return res.json({ msg: 'File not received'}); 

    let file = req.files.file;

    file.mv(`${__dirname}/images/${file.name}`, err => {
        if(err){
            console.log(err);
        }
    });

    tf.loadGraphModel('file://routes/api/class_model/model.json')
    .then(model => {

        console.log('Model loaded successfully');

        const width = 300;
        const height = 300;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const img = new Image();

        img.onload = () => {
            
            console.log('Image loaded');
            
            ctx.drawImage(img, 0, 0, width, height); 

        };
        img.onerror = err => { 
            //throw err 
            res.status(500).json({ msg: 'Image not loaded successfully!' });
        };
        
        //img.src = `${__dirname}/images/forest2.jpg`;
        img.src = `${__dirname}/images/${file.name}`;

        let tensor = tf.browser.fromPixels(canvas, 3)
                        .resizeNearestNeighbor([224,224])
                        .expandDims()
                        .toFloat()
                        .reverse(-1);

        const TARGET_CLASSES = {
            0: "Buildings",
            1: "Forest",
            2: "Glacier"
        };

        model.predict(tensor).data()
            .then(predictions => {
                let results = Array.from(predictions)
                    .map(function (p, i) { // this is Array.map
                        return {
                            probability: p,
                            className: TARGET_CLASSES[i] // we are selecting the value from the obj
                        };
                    }).sort(function (a, b) {
                        return b.probability - a.probability;
                    }).slice(0, 3);
                
                let list = [];

                results.forEach( each => {
                    row = {};
                    row['className'] = each.className;
                    row['probability'] = each.probability;
                    list.push(row);
                });

                console.log(list);

                fs.unlink(`${__dirname}/images/${file.name}`, err => {
                    if (err) 
                        console.log(err);
                    else
                        console.log('The file was deleted');
                });
                
                res.json({ list });

            })
            .catch(err => console.log('Model prediction error!'));    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: 'Server side error!' });
    });


});

module.exports = router;