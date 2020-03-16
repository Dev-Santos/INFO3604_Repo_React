const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

//Setting Up the PostgreSQL Database
const db = require('./config/database');

db.authenticate()
    .then(()=>console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

//Items Middleware - Use Routes
app.use('/api/items', require('./routes/api/Items'));

//Users Middleware - Use Routes
app.use('/api/users', require('./routes/api/Users'));

//Auth Middleware - Use Routes
app.use('/api/auth', require('./routes/api/Auth'));

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

    