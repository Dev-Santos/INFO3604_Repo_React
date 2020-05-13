import React, { useEffect } from 'react';

//Imported Bootstrap elements
// import Typography from '@material-ui/core/Typography';

//These modules allow us to use the actions in the actions folder and states defined in the reducer folder 
import {useSelector, useDispatch, shallowEqual}  from 'react-redux';

//Functions imported from the formActions file in the actions folder
import { getERListing } from '../../src/actions/formActions';

//Import the Slider Component to show the different images
import Slider from './Slider';

import './Homepage.css';

//Component Specification as a class
export default function Homepage() {

    //This constant stores the e-waste reports. These were captured as a state in the reducers folder
    const ereports = useSelector((state) => state.form.listing, shallowEqual);

    const dispatch = useDispatch();

    //This function executes the getERListing function from the formActions file
    const listing = () => {
        dispatch(getERListing());
    };

    //The useEffect function executes once the component is loaded and it references the listing function defined above
    //This essentially pulls the e-waste reports from our backend database
    useEffect(listing,[]);

    return(
        <div>
                        
            <br/>
            
            <Slider/> {/* Positioning of the Slider component */}
            
            <br/>

            <hr/>

            <div className="container">

                <div className="description">
                <div class="bg-light">
                <div class="container py-5">
                    <div class="row h-100 align-items-center py-5">
                        <div class="col-lg-6">
                        <h1 class="display-4">E-waste or Electronic Waste</h1>
                        <p class="lead text-muted mb-0">is growing three times faster than the rate of standard municipal waste.
                        E-waste contains potentially hazardous and valuable materials,
                        which don‘t belong in landfill.</p>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block"><img src="https://lh3.googleusercontent.com/proxy/RIMAomzsEBA9B60y-l6aCl1LVnISV_2KZMDhiaLbnHNl09fCT1z_HHVQQik-Kw3WVHk83P3Cp0lK6F6qsgeBE3SLrUw" alt="" class="img-fluid"/></div>
                    </div>
                </div>
            </div>
            <div class="bg-white py-5">
                <div class="container py-5">
                <h1 class="display-4">What you can do to help</h1>
                    <div class="row align-items-center mb-5">                        
                        <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                        <h2 class="font-weight-light">Become a Donor</h2>
                        <p class="lead text-muted mb-0">Help RSC by donating your used eletronics such as old laptops, desktops and phones.</p><a href="/api/register/donor" class="btn btn-light px-5 rounded-pill shadow-sm">Sign Up Now</a>
                        </div>
                        <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://webstockreview.net/images/electronics-clipart-e-waste.png" alt="" class="img-fluid mb-4 mb-lg-0"/></div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-5 px-5 mx-auto"><img src="https://lh3.googleusercontent.com/proxy/TXRin96qtypsX_n1lSmJyyO80OVuwwr1pgj6ee1MMVZ5LBAK2bOP9K_xUxcHNjDXlJb28QGET5yZlVT_cDdcJ8K_pw" alt="" class="img-fluid mb-4 mb-lg-0"/></div>
                        <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                        <h2 class="font-weight-light">Report Ewaste</h2>
                        <p class="lead text-muted mb-0">Don't be a bystander. If you see E-waste in landfills or even at the side of the road, report it here.</p><a href="/api/ereport" class="btn btn-light px-5 rounded-pill shadow-sm">Make Report</a>
                        </div>
                    </div>
                </div>
            </div>

                </div>                

                <hr />

                <div className="posts">

                    <h3>Recently Posted E-waste:</h3>
                    
                    {ereports ? ereports.map((record) => (
                        // <h1>{record.rep_person}</h1>,
                        // <img src={record.image_url} alt="..."></img>
                        <div className="row" key={record.id}>

                            <div className="col-12">

                                <table className="table table-image">

                                    <tbody>

                                        <tr>
                                            <td className="w-25">
                                                <img src={record.image_url} className="imageDetails img-fluid img-thumbnail" alt="..."/>
                                            </td>
                                            <td>
                                                <tr>
                                                    Posted by: {record.rep_person}
                                                </tr>
                                                <tr>
                                                    Description: {record.description}
                                                </tr>
                                                { <tr>
                                                    Location: {record.location}
                                                </tr> }
                                                <tr>
                                                    Device type: {record.classification}
                                                </tr>
                                                <tr>
                                                    Date posted: {record.date}
                                                </tr>
                                            </td>
                                            {/* <td className="w-25">
                                                <img src={record.image_url} className="img-fluid img-thumbnail" alt="Sample Pic1"/>
                                            </td>
                                            <td>{record.rep_person}</td>
                                            <td>{record.email}</td>
                                            <td>{record.description}</td>
                                            <td>{record.location}</td>
                                            <td>{record.classification}</td>
                                            <td>{record.date}</td> */}
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>



                    )): null}

                </div>

            </div>

        </div>   
    );
}