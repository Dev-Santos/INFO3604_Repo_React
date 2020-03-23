import React, {Fragment, useState} from 'react'
import { Input, Label, Container, Button } from 'reactstrap';
import axios from 'axios';

const formatResult = ({ className, probability}) => (
    <li key={className}>
        {`${className}: %${(probability * 100).toFixed(2)}`}
    </li>
);

const ReactUploadImage = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Select File');
    const [imageUrl, setImageUrl] = useState(null);
    const [results, setResults] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [classBtn, showClassBtn] = useState(false);

    const handleUpload = (e) => {
        const { files } = e.target;
        if(files.length > 0){
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            showClassBtn(true);
            setShowResults(false);
        }
    };

    const classify = async e => {

        e.preventDefault();

        if(file !== ''){

            const formData = new FormData();
            formData.append('file', file);
            
            try {

                const res = await axios.post('/api/upload', formData);

                const { list } = res.data;

                console.log(list);
                
                setResults(list);
                
                setShowResults(true);

            } catch (err) {
                if(err.response.status === 500 )
                    console.log(err.response.data.msg);
                else
                    console.log(err);
            }
        }else{
            console.log('No data');
        }
    }
    
    return(
        <Fragment>

                <Container className="custom-file mb-4">

                    <Label className="custom-file-label" for="class_input">
                        {filename}
                    </Label>
                    
                    <Input type="file" className="custom-file-input mt-4" id="class_input" onChange={handleUpload} accept="image/*" capture="camera" required/>
                    
                    { classBtn && <img src={imageUrl} style={{width: '150px', height: '150px'}} alt="" className="class_img" id="class_img"/>}

                    { classBtn && <Button style={{ display: 'block'}} className="btn btn-primary block mt-4" onClick={classify}>Classify Image</Button> }

                </Container>

                { showResults && <ul className="mt-4">
                    {results.map(formatResult)}
                </ul>}

        </Fragment>
    );
}


export default ReactUploadImage;