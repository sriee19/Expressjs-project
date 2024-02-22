/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */
const express = require('express');
const router = express.Router();
const users = require('../data/users');
const contacts = require('../data/contacts');

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact created successfully
 */
router.post('/', (req, res) => {
  const contactData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const defaultUserId = "sanjana123";
  let user = users.find((user) => user.id === defaultUserId);

  if (!user) {
    user = {
      id: defaultUserId,
      contacts: [],
    };
    users.push(user);
  }

  // if (!user.contacts) {
  //   user.contacts = [];
  // }

  const contactId = new Date().getTime().toString();
  const newContact = { id: contactId, ...contactData };
  user.contacts.push(newContact);

  res.status(200).json({
    message: 'Contact created successfully',
    contact: newContact,
  });
});


/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get('/', (req, res) => {
  const defaultUserId = "sanjana123";
  const user = users.find((user) => user.id === defaultUserId);

  if (user && user.contacts) {
    res.status(200).json(user.contacts);
  } else {
    res.status(404).json({ message: 'No contacts found' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 */
router.get('/:id', (req, res) => {
  const defaultUserId = "sanjana123";
  const user = users.find((user) => user.id === defaultUserId);

  if (user) {
    const contact = user.contacts.find((contact) => contact.id === req.params.id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 */
router.put('/:id', (req, res) => {
  const contactId = req.params.id;
  const updatedContactData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const defaultUserId = "sanjana123";
  const user = users.find((user) => user.id === defaultUserId);

  if (user && user.contacts) {
    const index = user.contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      user.contacts[index] = { id: contactId, ...updatedContactData };
      res.status(200).json({ message: 'Contact updated successfully', contact: user.contacts[index] });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 */
router.delete('/:id', (req, res) => {
  const contactId = req.params.id;

  const defaultUserId = "sanjana123";
  const user = users.find((user) => user.id === defaultUserId);

  if (user && user.contacts) {
    const index = user.contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      const deletedContact = user.contacts.splice(index, 1);
      res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
// console.log('Loaded route file: contacts.js');

module.exports = router;
