const express = require("express");
const {registerUser , 
    displayUser, 
    displayUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/display",displayUser);
router.get("/displays",displayUsers);
router.get("/getuser/:id", getUserById);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
// router.get("/current",validateToken, currentUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
module.exports =router;