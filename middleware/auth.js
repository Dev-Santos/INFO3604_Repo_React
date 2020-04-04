const config = require('config');
const jwt = require('jsonwebtoken');

//This function checks if a token was passed in the HTTP request header (specifically: 'x-auth-token') 
//and determines if it is a valid token

function auth(req, res, next) {

    //Access the HTTP request header information
    const token = req.header('x-auth-token');

    //Check for token
    
    //If a token does not exists
    if(!token) return res.status(401).json({ msg: 'No token, authorization denied'});

    try{
        
        //Verify token
        const decoded = jwt.verify(token, config.get('SECRET_KEY'));
        
        //Add user from payload
        req.user = decoded;
        next(); //Continue execution in the respective function

    }catch(e){//If token is invalid
        return res.status(400).json({ msg: 'Token is invalid'});
    }

}

module.exports = auth;