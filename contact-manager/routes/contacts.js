const express = require('express');
const router = express.Router();
const {
  createContact,
  getContactsForUser,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

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
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.userId; // Extracted from the token during authentication

    const contact = await createContact(userId, name, email, phone);

    res.status(200).json({
      message: 'Contact created successfully',
      contact: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts for the logged-in user
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
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token during authentication
    const contacts = await getContactsForUser(userId);

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token during authentication
    const contactId = req.params.id;
    const contact = await getContactById(userId, contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
 *           type: string
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
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token during authentication
    const contactId = req.params.id;
    const { name, email, phone } = req.body;

    const updatedContact = await updateContact(userId, contactId, name, email, phone);

    if (updatedContact) {
      res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token during authentication
    const contactId = req.params.id;
    const deletedContact = await deleteContact(userId, contactId);

    if (deletedContact) {
      res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
