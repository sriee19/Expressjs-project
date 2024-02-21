/**
 * @swagger
 * tags:
 *  name:Users
 *  description: API endpoints for managing users
 */

const express = require(`express`);
const router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary:Get all users
 *      tags:[Users]
 *      responses:
 *          200:
 *              description: Successful response
 */

router.get('/', (req,res)=>{
    res.send(`Get all users`);
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by ID
 *      tags: [Users]
 *      parameters:
 *          -in: path
 *          name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/:id', (req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
  });

  /**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Login user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful login
 */
router.post('/login', (req, res) => {
    res.send('User login');
  });
  /**
 * @swagger
 * /users/register:
 *  post:
 *    summary: Register user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: User registered successfully
 */
router.post('/register', (req, res) => {
    res.send('User registered');
  });
  
  /**
 * @swagger
 * /users/update/{id}:
 *  put:
 *    summary: Update user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              // Include properties for update
 *    responses:
 *      200:
 *        description: User updated successfully
 */
router.put('/update/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

/**
 * @swagger
 * /users/delete/{id}:
 *  delete:
 *    summary: Delete user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: User deleted successfully
 */
router.delete('/delete/:id', (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });
  module.exports = router;