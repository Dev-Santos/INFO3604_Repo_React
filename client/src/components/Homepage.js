import React, { Component } from 'react';

//Imported Bootstrap elements
import Typography from '@material-ui/core/Typography';

//Import the Slider Component to show the different images
import Slider from './Slider';

//Component Specification as a class
class Homepage extends Component{
    //The following is rendered/displayed on the browser
    render(){
        return(
            <div>

                <br/>

                {/* Main Header*/}
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Welcome to the website's Homepage
                </Typography>

                <Slider/> {/* Positioning of the Slider component */}
                
                <hr/>

                <br/>

                <div style={{textAlign: 'center'}}>
                    <h5>This can be a quote or moto...</h5>
                </div>

		        <hr/>

                <div className="container">

                    <h3>Recent Posts:</h3>

                    <div className="row">

                        <div className="col-12">

                            <table className="table table-image">

                                <tbody>

                                    <tr>
                                        <td className="w-25">
                                            <img src="" className="img-fluid img-thumbnail" alt="Sample Pic1"/>
                                        </td>
                                        <td>This could be some information that the user posts along with the picture</td>
                                    </tr>

                                    <tr>
                                        <td className="w-25">
                                            <img src="" className="img-fluid img-thumbnail" alt="Sample Pic2"/>
                                        </td>
                                        <td>This information could contain the location, e-waste type, condition, etc...</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>    

                </div>

            </div>   
        );
    }
}

export default Homepage; //Export the component to be used