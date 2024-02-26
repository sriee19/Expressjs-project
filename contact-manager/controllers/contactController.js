const users = require('../data/users');
const Contact = require('../models/contact');
function generateContactId() {
  return new Date().getTime().toString();
}

async function createContact(userId, name, email, phone) {
  const user = users.find(u => u.id === userId);

  if (user) {
    const contactId = generateContactId();
    const newContact = { id: contactId, name, email, phone };
    user.contacts.push(newContact);
    return newContact;
  } else {
    return null;
  }
}

async function getContactsForUser(userId) {
  try {
    const contacts = await Contact.find({ userId: userId });
    return contacts;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving contacts for the user');
  }
}

async function getContactById(userId, contactId) {
  try {
    const contact = await Contact.findOne({ userId: userId, _id: contactId });
    return contact || null;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving contact by ID');
  }
}

async function updateContact(userId, contactId, name, email, phone) {
  try {
    const contact = await Contact.findOne({ userId: userId, _id: contactId });

    if (contact) {
      contact.name = name || contact.name;
      contact.email = email || contact.email;
      contact.phone = phone || contact.phone;

      await contact.save();
      return contact;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error updating contact');
  }
}


async function deleteContact(userId, contactId) {
  try {
    const deletedContact = await Contact.findOneAndDelete({ userId: userId, _id: contactId });

    return deletedContact;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting contact');
  }
}

module.exports = {
  createContact,
  getContactsForUser,
  getContactById,
  updateContact,
  deleteContact,
};
