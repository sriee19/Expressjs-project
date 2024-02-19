const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const {constants} = require("../constants");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req,res)  => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json({contacts});
});


//@desc create new contacts
//@route POST /api/contacts
//@access private

const createContact =asyncHandler(async(req,res)  => {
    console.log("The request body is:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All files are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({contact});
});


//@desc get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async(req,res)  => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error("Contact Not found");
    }
    res.status(200).json(contact);
});


//@desc update contacts
//@route POST /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res)  => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(constants.FORBIDDEN);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate
    (
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});


//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact= asyncHandler(async(req,res)  => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(constants.FORBIDDEN);
        throw new Error("User don't have permission to update other user contacts");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContacts ,createContact, getContact, updateContact, deleteContact};
