//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res) =>{
    res.json({message: "Register the user"});
});
