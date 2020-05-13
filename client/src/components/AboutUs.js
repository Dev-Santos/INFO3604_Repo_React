import React from 'react';

//Component Specification using React Hooks
function AboutUs(){
    return(
        //The following is the HTML code from the previous system built
        <div>
            <div class="bg-light">

                <div class="container py-5">
                    <div class="row h-100 align-items-center py-5">
                        <div class="col-lg-6">
                        <h2 class="display-4">The Story</h2>
                        <p class="lead text-muted mb-0">Restore a Sence of I Can(RSC) is a Non-Profit organisation with its goal, "Effecting Change through Technology and Education."</p> 
                        <p class="lead text-muted mb-0"> RSC's main projects involve students at the Primary and Secondary School level.</p> 

                        </div>
                        <div class="col-lg-6 d-none d-lg-block"><img src="https://i.pinimg.com/originals/98/ba/a9/98baa97bec6a68dc7cc264fad8c8af05.png" alt="" class="img-fluid"/></div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white py-5">
                <div class="container py-5">
                    <div class="row align-items-center mb-5">
                        <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                        <h2 class="font-weight-light">RSC Tech Clubs</h2>
                        <p class="font-italic text-muted mb-4">One of the projects of RSC is the development and support of technology clubs in schools and tertiary instituations across the Caribbean </p>
                        <p class="font-italic text-muted mb-4">To Date, RSC has Technology Clubs in Trinidad, Grenanda, St.Lucia, St Vincent and the Grenedines, St Kitts and Nevis, Belize and Costa Rica. </p>
                        <a href="https://www.facebook.com/RSCTechClubs" class="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                        </div>
                        <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://i.pinimg.com/originals/1b/c9/5c/1bc95c6b530e2c4a7dfe7ea06715496a.png" alt="" class="img-fluid mb-4 mb-lg-0"/></div>
                    </div>
                </div>
            </div>
            
            <div class="bg-light py-5">
                <div class="container py-5">
                    <div class="row mb-4">
                        <div class="col-lg-5">
                            <h2 class="display-4 font-weight-light">Our team</h2>
                            <p class="font-italic text-muted">Here is a list of Developers for the E-Margin8 Site</p>
                        </div>
                    </div>
            
                    <div class="row text-center">
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-1_s02nlg.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                                <h5 class="mb-0">Raphael Superville</h5><span class="small text-uppercase text-muted">Developer</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
            
                    
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834130/avatar-3_hzlize.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                                <h5 class="mb-0">Mohit Ramdass</h5><span class="small text-uppercase text-muted">Developer</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    
            
                        <div class="col-xl-3 col-sm-6 mb-5">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-2_f8dowd.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                                <h5 class="mb-0">Adrian Santo</h5><span class="small text-uppercase text-muted">Developer</span>
                                <ul class="social mb-0 list-inline mt-3">
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-instagram"></i></a></li>
                                <li class="list-inline-item"><a href="/" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;//Export the component to be used