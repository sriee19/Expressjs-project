/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

const express = require('express');
const router = express.Router();

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
    res.send('Create a new contact');
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
