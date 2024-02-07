//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req,res)  => {
    res.status(200).json({message:"Get all contacts"});
};


//@desc create new contacts
//@route POST /api/contacts
//@access public

const createContact =(req,res)  => {
    res.status(200).json({message:"Create Contacts"});
};


//@desc get contacts
//@route GET /api/contacts/:id
//@access public

const getContact =(req,res)  => {
    res.status(200).json({message:`get contacts for ${req.params.id}`});
};


//@desc update contacts
//@route POST /api/contacts/:id
//@access public

const updateContact =(req,res)  => {
    res.status(200).json({message:`update contacts for ${req.params.id}`});
};


//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access public

const deleteContact= (req,res)  => {
    res.status(200).json({message:`delete contacts for ${req.params.id}`});
};

module.exports = { getContacts ,createContact, getContact, updateContact, deleteContact};
