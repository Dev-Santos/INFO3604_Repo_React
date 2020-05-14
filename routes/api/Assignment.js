const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');//Authentication middleware

const { QueryTypes } = require('sequelize');

//Database connection - sequelize var
const db = require('../../config/database');

//Assignment Model
const Assignment = require('../../models/Assignment');

//Donation Model
const Donation = require('../../models/Donation');

//DonationRequest Model
const DonationRequest = require('../../models/DonationRequest');

//EWasteReport Model
const EWasteReport = require('../../models/EWasteReport');


//@route    GET api/assignment/listing
//@desc     Get all assignment information
//@access   Private
router.get('/listing', auth, (req, res)=>{
    
    //Search for all e-waste collection activities
    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, e.rep_person, e.email, e.telephone, e.description, e.location, e.image_url, e.date AS e_date, u.name FROM assignments AS a JOIN ewaste_reports AS e ON a.record_id = e.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 1 ORDER BY a.date DESC;", { type: QueryTypes.SELECT})
        .then( ereports => {

            //Search for all company donation activities
            db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN companies AS c on don.email = c.CompanyEmail JOIN donors AS d ON d.CompanyID = c.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 ORDER BY a.date DESC;", { type: QueryTypes.SELECT})
                .then( comp_dons => {

                    //Search for all individual donation activities
                    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, d.Phone, u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN donors AS d on don.email = d.Email JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 ORDER BY a.date DESC", { type: QueryTypes.SELECT})
                        .then( ind_dons => {

                                //Search for all donation request activities
                                db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, d.name AS d_name, d.email, d.request, d.quantity, d.reason, d.location, d.date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donation_requests AS d ON a.record_id = d.id JOIN companies AS c on d.email = c.CompanyEmail JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 3 ORDER BY a.date DESC;", { type: QueryTypes.SELECT})
                                .then( donation_reqs => {

                                    return res.status(200).json({ ereports, donations:{comp_dons, ind_dons}, donation_reqs});//Return captured results

                                })
                                .catch( err => { return res.status(500).json({ msg: 'Error in pulling donation request assignment records' }) });      

                        })
                        .catch( err => { return res.status(500).json({ msg: 'Error in pulling individual donations assignment records' }) });


                })
                .catch( err => { return res.status(500).json({ msg: 'Error in pulling company donation assignment records' }) }); 

        })
        .catch( err => { return res.status(500).json({ msg: 'Error in pulling ereports assignment records' }) });
    

});

//@route    POST api/assignment
//@desc     Submit a new assignment
//@access   Private
router.post('/', auth, (req, res)=>{
    
    const { cm_id, assignment_type_id, record_id, date } = req.body;
    
    //Simple validation
    if (!cm_id || !assignment_type_id || ! record_id || !date){
        return res.status(400).json({msg: 'Please provide all fields'});
    }
    
    //Create an assignment record
    Assignment.create({ assignment_type_id, cm_id, record_id, date, reg_date: Date.now(), status: 0, comments: ''  })
    .then( record => {
        return res.status(200).json(record);//Return newly created record
    })
    .catch( err => { return res.status(500).json({msg: 'Error in creating assignment record'}); } );
    
    
});


//@route    POST api/assignment/cm_listing
//@desc     Obtain upcoming delivery/collection records for a club member (based on their id)
//@access   Private
router.post('/cm_listing', auth, (req, res)=>{    
    
    const { cm_id } = req.body;

    //Simple validation
    if (!cm_id ){
        return res.status(400).json({msg: 'Please provide all fields'});
    }

    //Pull all associated e-waste collection activities
    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, e.id AS e_id, e.rep_person, e.email, e.telephone, e.description, e.location, e.image_url, e.date AS e_date, u.name FROM assignments AS a JOIN ewaste_reports AS e ON a.record_id = e.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 1 AND a.cm_id = ? AND a.date >= CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
        .then( ereports => {

            //Pull all associated company donation activities
            db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.id AS don_id, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN companies AS c on don.email = c.CompanyEmail JOIN donors AS d ON d.CompanyID = c.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 AND a.cm_id = ? AND a.date >= CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
                .then( comp_dons => {

                    //Pull all associated individual donation activities
                    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.id AS don_id, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, d.Phone, u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN donors AS d on don.email = d.Email JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 AND a.cm_id = ? AND a.date >= CURDATE() ORDER BY a.date DESC", { replacements: [cm_id], type: QueryTypes.SELECT })
                        .then( ind_dons => {

                                //Pull all associated donation request activities
                                db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, d.id AS d_id, d.name AS d_name, d.email, d.request, d.quantity, d.reason, d.location, d.date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donation_requests AS d ON a.record_id = d.id JOIN companies AS c on d.email = c.CompanyEmail JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 3 AND a.cm_id = ? AND a.date >= CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
                                .then( donation_reqs => {

                                    return res.status(200).json({ ereports, donations:{comp_dons, ind_dons}, donation_reqs});//Return captured results

                                })
                                .catch( err => { return res.status(500).json({ msg: 'Error in pulling donation request assignment records' }) });      

                        })
                        .catch( err => { return res.status(500).json({ msg: 'Error in pulling individual donations assignment records' }) });


                })
                .catch( err => { return res.status(500).json({ msg: 'Error in pulling company donation assignment records' }) }); 

        })
        .catch( err => { return res.status(500).json({ msg: 'Error in pulling ereports assignment records' }) });
    

});


//@route    POST api/assignment/cm_completed
//@desc     Obtain elapsed delivery/collection records (to be logged) for a club member (based on their id)
//@access   Private
router.post('/cm_completed', auth, (req, res)=>{    
    
    const { cm_id } = req.body;

    //Simple validation
    if (!cm_id ){
        return res.status(400).json({msg: 'Please provide all fields'});
    }

    //Pull all associated e-waste collection activities    
    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, e.id AS e_id, e.rep_person, e.email, e.telephone, e.description, e.location, e.image_url, e.date AS e_date, u.name FROM assignments AS a JOIN ewaste_reports AS e ON a.record_id = e.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 1 AND a.cm_id = ? AND a.date < CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
        .then( ereports => {

            //Pull all associated company donation activities
            db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.id AS don_id, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN companies AS c on don.email = c.CompanyEmail JOIN donors AS d ON d.CompanyID = c.id JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 AND a.cm_id = ? AND a.date < CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
                .then( comp_dons => {

                    //Pull all associated individual donation activities
                    db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, don.id AS don_id, don.donor, don.email, don.item_type, don.item_desc, don.serial_no, don.units, don.retrieval_loc, don.image_url, don.date AS d_date, d.Phone, u.name FROM assignments AS a JOIN donations AS don ON a.record_id = don.id JOIN donors AS d on don.email = d.Email JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 2 AND a.cm_id = ? AND a.date < CURDATE() ORDER BY a.date DESC", { replacements: [cm_id], type: QueryTypes.SELECT })
                        .then( ind_dons => {

                                //Pull all associated donation request activities                                        
                                db.query("SELECT a.id AS a_id, a.assignment_type_id, a.date AS a_date, a.reg_date, a.status, a.comments, d.id AS d_id, d.name AS d_name, d.email, d.request, d.quantity, d.reason, d.location, d.date, c.CompanyPhoneNumber, c.MainContact, c.ContactNumber , u.name FROM assignments AS a JOIN donation_requests AS d ON a.record_id = d.id JOIN companies AS c on d.email = c.CompanyEmail JOIN users AS u ON a.cm_id = u.id WHERE a.assignment_type_id = 3 AND a.cm_id = ? AND a.date < CURDATE() ORDER BY a.date DESC;", { replacements: [cm_id], type: QueryTypes.SELECT })
                                .then( donation_reqs => {

                                    return res.status(200).json({ ereports, donations:{comp_dons, ind_dons}, donation_reqs});//Return captured results

                                })
                                .catch( err => { return res.status(500).json({ msg: 'Error in pulling donation request assignment records' }) });      

                        })
                        .catch( err => { return res.status(500).json({ msg: 'Error in pulling individual donations assignment records' }) });


                })
                .catch( err => { return res.status(500).json({ msg: 'Error in pulling company donation assignment records' }) }); 

        })
        .catch( err => { return res.status(500).json({ msg: 'Error in pulling ereports assignment records' }) });
    

});


//@route    POST api/assignment/update
//@desc     Indicate that a club activity is completed
//@access   Private
router.post('/update', auth, (req, res)=>{    
    
    const { comments, type, a_id, record_id } = req.body;

    //Simple validation
    if (!comments || !type || !a_id || !record_id ){
        return res.status(400).json({msg: 'Please provide all fields'});
    }

    //Further validation
    if ( ['don_req', 'don', 'er'].includes(type) ){
        
            //Update assignment record (as completed)
            Assignment.findOne({where: { id: a_id }})
                .then( assignment => {
        
                    if (assignment){
        
                        //If a record is found set its status to 1 (meaning the assignment is completed)
                        assignment.status = 1;
                        //Input provided comments
                        assignment.comments = comments;
                            
                        //Save changes
                        assignment.save()
                            .then( assignment => { 
        
                                
                                if ( type === 'don_req'){  //If the activity is a donation delivery
        
                                    DonationRequest.findOne({ where: { id: record_id }})
                                        .then( record => {
                                            
                                            if (record){
                            
                                                //If a record is found indicate that is completed
                                                record.completed = 1;
                                                
                                                //Save changes
                                                record.save()
                                                    .then( record => { 
                                                        return res.status(200).json({record, assignment}); //Return updated records
                                                    })
                                                    .catch(err => { return res.status(400).json({msg: 'Donation Request record not saved'});});
                            
                                            }else{
        
                                                return res.status(400).json({msg: 'Donation Request record not found'});
        
                                            }   
                                            
                                        } )
                                        .catch( err => { return res.status(500).json({ msg: 'Error in pulling donation request records' }); } );
                                   
                                
                                }else if ( type === 'don' ) {  //If the activity is a donation collection
        
                                    Donation.findOne({ where: { id: record_id }})
                                        .then( record => {
                                            
                                            if (record){
                            
                                                //If a record is found indicate that is completed
                                                record.completed = 1;
                                                
                                                //Save changes
                                                record.save()
                                                    .then( record => { 
                                                        return res.status(200).json({record, assignment}); //Return updated records
                                                    })
                                                    .catch(err => { return res.status(400).json({msg: 'Donation record not saved'});});
                            
                                            }else{
        
                                                return res.status(400).json({msg: 'Donation record not found'});
        
                                            }
                                        })
                                        .catch( err => { return res.status(500).json({ msg: 'Error in pulling donation records' }); } );
                                    
                                }else{ //If the activity is a e-waste collection
        
                                    EWasteReport.findOne({ where: { id: record_id }})
                                    .then( record => {
                                        
                                        if (record){
                        
                                            //If a record is found indicate that is completed
                                            record.completed = 1;
                                            
                                            //Save changes
                                            record.save()
                                                .then( record => { 
                                                    return res.status(200).json({record, assignment}); //Return updated records
                                                })
                                                .catch(err => { return res.status(400).json({msg: 'E-Waste report record not saved'});});
                        
                                        }else{
        
                                            return res.status(400).json({msg: 'E-Waste report record not found'});
        
                                        }
                                    })
                                    .catch( err => { return res.status(500).json({ msg: 'Error in pulling E-Waste report records' }); } );
        
                                }
                                
                            })
                            .catch(err => { return res.status(400).json({msg: 'Assignment record not saved'});});
        
                    }else{
                        return res.status(400).json({msg: 'Assignment record not found'});   
                    }
        
                })
                .catch( err => { return res.status(500).json({ msg: 'Error in pulling assignment records' }); });

    }else{
        return res.status(400).json({msg: 'Incorrect activity type'});
    }


});



module.exports = router;