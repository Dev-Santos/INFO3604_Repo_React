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
                    <h3>E-waste or Electronic Waste </h3>
                    <p>                    
                        is growing three times faster than the rate of standard municipal waste.
                        E-waste contains potentially hazardous and valuable materials,
                        which don‘t belong in landfill.
                    </p>
                    {/* <h3>What is e-waste?</h3>
                    <p>E-waste is any item with a</p>
                    <p>plug</p>
                    <p>battery</p>
                    <p>or power cord</p>
                    <p>that is no longer working or wanted.</p>
                    <p>It covers a whole range of items from phones and</p>
                    <p>refrigerators to fluorescent light tubes.</p> */}
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
                                                {/* <tr>
                                                    Location: {record.location}
                                                </tr> */}
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



                    )): "null"}

                </div>

            </div>

        </div>   
    );
}