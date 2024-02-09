const express = require("express");
const {registerUser, 
    currentUser , displayUser, displayUsers,getUserById,
    loginUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register",registerUser);


router.post("/login",loginUser);

router.get("/display",displayUser);
router.get("/displays",displayUsers);
router.get("/getuser/:id", getUserById);
router.get("/current",validateToken, currentUser);

module.exports =router;