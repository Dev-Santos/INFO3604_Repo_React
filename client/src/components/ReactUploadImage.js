import React, {Fragment, useState} from 'react'
import { Form, Input, Label, Container } from 'reactstrap';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import path from 'path';
import modelJson from './class_model/model.json';

/*const ReactUploadImage = () => {
    
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, error } = res.data;
            setUploadedFile({fileName});

            console.log(error);
            console.log(fileName);

        } catch (err) {
            console.log(err.response.data.msg);
        }
    }
    
    return(
        <Fragment>
            <Form onSubmit={onSubmit}>
                <Container className="custom-file mb-4">
                    <Input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <Label className="custom-file-label" for="customFile">
                        {filename}
                    </Label>
                </Container>

                <Input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </Form>
        </Fragment>
    );
}*/


const ReactUploadImage = () => {

    const [filename, setFilename] = useState('Choose File');
    const [imageUrl, setImageUrl] = useState(null);
    //const [results, setResults] = useState({});

    const handleUpload = (e) => {
        const { files } = e.target;
        if(files.length > 0){
            setFilename(e.target.files[0].name);
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
        }
    };

    const onSubmit = async e => {

        e.preventDefault();
        
        const img = document.getElementById('class_img');

        /*const formData = new FormData();
        formData.append('file', file);

        
        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { msg, fileName } = res.data;

            console.log(msg);
            console.log(fileName);

        } catch (err) {
            console.log(err.response.data.msg);
        }*/

        const tensor = tf.browser.fromPixels(img)
                        .resizeNearestNeighbor([224,224])
                        .expandDims()
                        .toFloat()
                        .reverse(-1);
        console.log(tensor);
        console.log(tensor.shape);
        
        //tf.loadGraphModel(modelJson)
        //tf.loadGraphModel("class_model/model.json")
        /*loadGraphModel('./class_model/model.json')
        //node.loadGraphModel("class_model/model.json")
            .then(model => console.log('Model loaded successfully'))
            .catch(err => console.log("Error: ", err));*/
    }
    
    return(
        <Fragment>
            <Form onSubmit={onSubmit}>
                <Container className="custom-file mb-4">

                    <img src={imageUrl} alt="upload-preview" className="class_img" id="class_img"/>
                    
                    <Input type="file" className="custom-file-input mt-4" id="class_input" onChange={handleUpload} accept="image/*" capture="camera"/>
                    
                    <Label className="custom-file-label" for="class_input">
                        {filename}
                    </Label>
                </Container>

                <Input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </Form>
        </Fragment>
    );
}



export default ReactUploadImage;

/*class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/api/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default ReactUploadImage*/