const mongoose = require('mongoose');

const regExEmailId = /\b[A-Za-z0-9._%+-]+@northeastern\.edu\b/;
const regExFirstName = /^[A-Za-z0-9@*.#]*$/;
const regExPassword = /^(?=.*[@*.#])[A-Za-z0-9@*.#]*$/;

const userSchema = new mongoose.Schema( 
{
    full_name : {
        type: String, 
        required:true,
        default: '',
        minlength: 5, 
        maxlength: 50,
        match: regExFirstName
        
    },
    email:{
        type: String,
        required:true, 
        default: '',
        minlength: 5,
        maxlength: 50,
        match: regExEmailId
        
    },
    password:{
        type: String,
        required:true, 
        default: '',
        minlength: 5,
        maxlength: 50,
        match: regExPassword
        
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;