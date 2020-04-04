const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const { Image, createCanvas } = require('canvas');

router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

router.use(express.json());


//@route    POST api/upload
//@desc     Receives image uploaded and returns the classification results
//@access   Public
router.post("/", (req, res) => {

    //If no image is provided
    if(req.files == null)
        return res.json({ msg: 'File not received'}); 

    let file = req.files.file;

    //This function loads our classification model
    tf.loadGraphModel('file://routes/api/class_model/model.json')
    .then(model => {

        console.log('Model loaded successfully');

        //The following is responsible for pre-processing the image to be classified
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

        img.src = file.tempFilePath;

        let tensor = tf.browser.fromPixels(canvas, 3)
                        .resizeNearestNeighbor([224,224])
                        .expandDims()
                        .toFloat()
                        .reverse(-1);

        //Here we define our classification labels                     
        const TARGET_CLASSES = {
            0: "CPU",
            1: "Keyboard",
            2: "Laptop",
            3: "Monitor",
            4: "Mouse",
            5: "Printer"
        };

        //Now we classify our provided image
        model.predict(tensor).data()
            .then(predictions => {
                
                //After classification we generate a json object of our results

                let results = Array.from(predictions)
                    .map(function (p, i) {
                        return {
                            probability: p,
                            className: TARGET_CLASSES[i] // we are selecting the value from the obj
                        };
                    }).sort(function (a, b) {
                        return b.probability - a.probability;
                    }).slice(0, 3);// Select only the top 3 results
                
                
                let list = [];

                results.forEach( each => {
                    row = {};
                    row['className'] = each.className;
                    row['probability'] = each.probability;
                    list.push(row);
                });

                console.log(list);
                
                //We return our classification results
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