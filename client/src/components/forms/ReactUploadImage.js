// Needed React Modules
import React, {Fragment, useState} from 'react';

//Imported Bootstrap elements
import { Input, Label, Container, Button } from 'reactstrap';

//The Axios module was also used in the different files in the actions folder
//This is how the front-end component of the system communicates/accesses with the backend api and database (Express & Nodejs)
import axios from 'axios';

//This functions formats how the classification results are displayed
//It is in the form of list items, it will be called later down
const formatResult = ({ className, probability}) => (
    <li key={className}>
        {`${className}: %${(probability * 100).toFixed(2)}`}
    </li>
);

//There are different ways to code up a component.
//One way was seen with the CreateAdmin, LoginModal, Logout, RegisterModal, EWasteReport and AppNavbar components
//where a component was defined a class

//As seen below, a component can also be defined as a function as well. This method is called React Hooks.

const ReactUploadImage = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Select File');
    const [imageUrl, setImageUrl] = useState(null);
    const [results, setResults] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [classBtn, showClassBtn] = useState(false);

    //This is similar to initially setting the state of the component.
    //You pass the initial state as the parameter of the useState function

    //The first part of the const array (i.e. file, filename) is the name of the state
    //The second part of the const array (i.e. setFile, setFilename) is the name of the function used to change that particular state
    //So if you want to change the state of file (for example) => you would call setFile('filename.jpg') with the new state value as the parameter



    //This function is executed everytime an image is browsed and uploaded by the user
    const handleUpload = (e) => {

        //Extracts all the file information submitted on the form
        const { files } = e.target;

        //Once there is at least one file
        if(files.length > 0){

            //Save the image file (the first file) in file state of the component using its designated function
            setFile(e.target.files[0]);

            //Similarly, save the image's filename in filename state of the component using its designated function
            setFilename(e.target.files[0].name);

            //Get the image's url
            const url = URL.createObjectURL(files[0]);

            //Save it to the imageUrl state of the component using its designated function 
            setImageUrl(url);


            showClassBtn(true);
            //Change the classBtn state of the component to true using its designated function 
            //This essentially means show the classification button only when an image file is uploaded
            
            setShowResults(false);
            //Change the showResults state of the component to false using its designated function 
            //This essentially means don't show the results until it is classified.
            
        }
    };



    //This function executes once the classification button is selected
    const classify = async e => {

        e.preventDefault();

        //Once an image is provided
        if(file !== ''){

            //Create the request body using the FormData class
            const formData = new FormData();

            //Append the submitted file to the request body
            formData.append('file', file);
            
            try {

                //Hit the backend api (Express & Nodejs) with the image to be classified => the response/results are stored in res
                const res = await axios.post('/api/upload', formData);

                //Extract the classification results
                const { list } = res.data;

                console.log(list);
                
                //Save the result to the results state of the component using its designated function 
                setResults(list);
                
                //Change the showResults state to true as we have classified the image
                setShowResults(true);

            } catch (err) {//If an error is caught
                if(err.response.status === 500 )
                    console.log(err.response.data.msg);
                else
                    console.log(err);
            }
        }else{
            console.log('No data');
        }
    }
    
    //The following is rendered/displayed on the browser
    return(
        
        <Fragment> {/* The Fragment element is used to indicated that the following is a fragment/block of elements to be rendered by React */}

                <Container className="custom-file mb-4">

                    <Label className="custom-file-label" for="class_input">
                        {/* Since we stored the image's filename in the filename state of the component we can display it*/}
                        {/* The following is how you render a component variable on the browser screen */}
                        {filename}
                    </Label>
                    
                    {/* Image Input Field */}
                    <Input type="file" className="custom-file-input mt-4" id="class_input" onChange={handleUpload} accept="image/*" capture="camera" required/>
                    

                    {/* The classBtn state is boolean*/}
                    {/* This essentially means if the classBtn state is true, then show the uploaded image on the browser*/}
                    {/* The AND operator allows us to do this*/}
                    { classBtn && <img src={imageUrl} style={{width: '150px', height: '150px'}} alt="" className="class_img" id="class_img"/>}


                    {/* Similarly, if the classBtn state is true, then show the classification button on the browser*/}
                    { classBtn && <Button style={{ display: 'block'}} className="btn btn-primary block mt-4" onClick={classify}>Classify Image</Button> }

                </Container>

                {/* The showResults state is also boolean*/}
                {/* Similarly, if the showResults state is true, then show the classification results on the browser*/}
                {/* The AND operator allows us to do this*/}
                { showResults && 
                    <ul className="mt-4">      
                        {/* We utilise the function on line 13 to format the results*/}
                        {results.map(formatResult)}
                    </ul>
                }

        </Fragment>
    );
}


export default ReactUploadImage;//Export the component to be used