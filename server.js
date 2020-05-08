const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

//Setting Up the MySQL Database connection
const db = require('./config/database');

db.authenticate()
    .then(()=>console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

//Registration Middleware - Use Routes
app.use('/api/register', require('./routes/api/Registration'));

//Authentication Middleware - Use Routes
app.use('/api/auth', require('./routes/api/Auth'));

//Upload Middleware - Use Routes
app.use('/api/upload', require('./routes/api/ImgUpload'));

//Club Middleware - Use Routes
app.use('/api/clubs', require('./routes/api/Clubs'));

//Donor Middleware - Use Routes
app.use('/api/donor', require('./routes/api/Donors'));

//EWaste Report Middleware - Use Routes
app.use('/api/ereport', require('./routes/api/EWaste_Report'));

//Beneficiary Middleware - Use Routes
app.use('/api/beneficiary', require('./routes/api/Beneficiary'));

//Mail Middleware - Use Routes
app.use('/api/mail', require('./routes/api/Mail'));

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const port = process.env.PORT || 81;

app.listen(port, function() {
    console.log("Listening");
});

    