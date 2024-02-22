const users = require('../data/users');

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
  const user = users.find(u => u.id === userId);

  if (user && user.contacts) {
    return user.contacts;
  } else {
    return [];
  }
}

async function getContactById(userId, contactId) {
  const user = users.find(u => u.id === userId);

  if (user) {
    const contact = user.contacts.find(c => c.id === contactId);
    return contact || null;
  } else {
    return null;
  }
}

async function updateContact(userId, contactId, name, email, phone) {
  const user = users.find(u => u.id === userId);

  if (user && user.contacts) {
    const index = user.contacts.findIndex(c => c.id === contactId);

    if (index !== -1) {
      user.contacts[index] = { id: contactId, name, email, phone };
      return user.contacts[index];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

async function deleteContact(userId, contactId) {
  const user = users.find(u => u.id === userId);

  if (user && user.contacts) {
    const index = user.contacts.findIndex(c => c.id === contactId);

    if (index !== -1) {
      const deletedContact = user.contacts.splice(index, 1);
      return deletedContact[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = {
  createContact,
  getContactsForUser,
  getContactById,
  updateContact,
  deleteContact,
};
