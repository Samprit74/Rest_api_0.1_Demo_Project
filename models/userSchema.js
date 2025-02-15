const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone_no:{
        type:Number,
        require:true,
        unique:true
    },
    profession:{
        type:String,
        default:'fresser'
    },
});

const User = mongoose.model('User',userSchema);
module.exports = User;