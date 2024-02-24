const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../data/users');
const User = require('../models/user');

const JWT_SECRET_KEY = 'sanjana123'; 


/**
 * Middleware to authenticate the token.
 * Extracts the user information from the token and adds it to the request object.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {function} next - The next middleware function.
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Received Token', token);

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

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: API endpoints for managing users
//  */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
function generateUserId() {
  return new Date().getTime().toString();
}

router.post('/register', async(req, res) => {
  const userId = generateUserId();
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const newUser = await User.create(userData);

    res.status(200).json({
      id: newUser._id,
      username: newUser.username,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      id: user.id,
      username: user.username,
      token: token,
      message: 'Successful login',
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.status(200).json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
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
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.get('/:id', (req, res) => {
  const userId = req.params.id.toString();
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.put('/update/:id', (req, res) => {
  const userId = req.params.id.toString();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].username = req.body.username || users[userIndex].username;
    users[userIndex].password = req.body.password || users[userIndex].password;
    users[userIndex].email = req.body.email || users[userIndex].email;

    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/delete/:id', (req, res) => {
  const userId = req.params.id.toString();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const deleteUser = users.splice(userIndex, 1);
    res.status(200).json({ message: `User ${userId} deleted successfully`, deleteUser });
  } else {
    res.status(404).json({ message: `User not found` });
  }
});

module.exports = router;
