const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res) =>{
    const {username, email, password} =req.body;
    if(!username || !email|| !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hashpassword
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed password: ", hashedPassword);
    const user = await User.create({
       username,
       email,
       password: hashedPassword,
    });

    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
});
 
//@desc Login  user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async(req,res) =>{
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error ("All files are mandatory");
    }
    const user = await User.findOne({email});

    //compare password with the used hashpassword
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },

        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

    //@desc Display all registered users' usernames
    //@route GET /api/users/displayAll
    //@access public

    const displayUser = asyncHandler(async (req, res) => {
        try {
            const allUsers = await User.find();
            if ( allUsers.length > 0) {
                const usernames = allUsers.map(user => user.username);
                res.status(200).json(usernames);
            } else {
                res.status(404).json({ message: "No users found" });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
});
    
    
    //@desc Display all registered users
    //@route GET /api/users/displayAll
    //@access public

    const displayUsers = asyncHandler(async (req, res) => {
        try {
            const allUsers = await User.find();
            if (allUsers.length > 0) {
                res.status(200).json(allUsers);
            } else {
                res.status(404).json({ message: "No users found" });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
});



//@desc current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async(req,res) =>{
    res.json(req.user);
});
 
module.exports = {registerUser,loginUser,currentUser,displayUser,displayUsers};
