/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

const express = require('express');
const jwt = require(`jsonwebtoken`);
const router = express.Router();
const users = require('../data/users');

const JWT_SECRET_KEY = `sanjana123`;

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []  
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
router.post('/', authenticateToken, (req, res) => {
  const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
  };

  const loggedInUserId = req.user.id; // Extracted from the token during authentication

  const user = users.find((user) => user.id === loggedInUserId);

  if (user) {
      if (!user.contacts) {
          user.contacts = [];
      }
      user.contacts.push(contactData);

      res.status(200).json({
          message: 'Contact created successfully',
          contact: contactData,
      });
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user;
      next();
  });
}
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', (req, res) => {
  res.send('Get all contacts');
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
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/:id', (req, res) => {
  res.send(`Get contact with ID ${req.params.id}`);
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
  res.send(`Update contact with ID ${req.params.id}`);
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
  res.send(`Delete contact with ID ${req.params.id}`);
});

// console.log('Loaded route file: contacts.js');

module.exports = router;
