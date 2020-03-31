import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';


import Slider from './Slider';

class Homepage extends Component{
    render(){
        return(
            <div>
                <br/>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Welcome to the website's Homepage
                </Typography>
                <Slider/>
                <hr/>
                <br/>
                <div style={{textAlign: 'center'}}>
                    <h5>This can be a quote or moto...</h5>
                </div>
		        <hr/>
                <div class="container">
                    <h3>Recent Posts:</h3>
                    <div class="row">
                        <div class="col-12">
                            <table class="table table-image">
                                <tbody>
                                    <tr>
                                        <td class="w-25">
                                            <img src="../pics/sampleEwaste.jfif" class="img-fluid img-thumbnail" alt="Sample Pic1"/>
                                        </td>
                                        <td>This could be some information that the user posts along with the picture</td>
                                    </tr>
                                    <tr>
                                        <td class="w-25">
                                            <img src="../pics/sampleEwaste2.jfif" class="img-fluid img-thumbnail" alt="Sample Pic2"/>
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

export default Homepage;