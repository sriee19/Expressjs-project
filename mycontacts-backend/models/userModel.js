const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: [true, "please add the username"],
    },
    email: {
        type:String,
        required: [true, "please add the email"],
        unique:[true,"Already taken"],
    },
    password: {
        type:String,
        required: [true, "please add the user password"],
    },
},{
    timestamp:true,
});

module.exports = mongoose.model("User",userSchema);