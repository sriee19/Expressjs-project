const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
  createContact,
  getContactsForUser,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');


const JWT_SECRET_KEY = 'sanjana123'; 

/**
 * Middleware to authenticate the token.
 * Extracts the user information from the token and adds it to the request object.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = decoded; 
    next();
  });
}
 router.use(authenticateToken);
// /**
//  * @swagger
//  * tags:
//  *   name: Contacts
//  *   description: API endpoints for managing contacts
//  */

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
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.userId; 

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
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; 
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
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; 
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
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; 
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
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; 
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