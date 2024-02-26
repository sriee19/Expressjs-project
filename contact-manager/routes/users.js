const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const users = require('../data/users');
const User = require('../models/user');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'sanjana123'; 


/**
 * Middleware to authenticate the token.
 * Extracts the user information from the token and adds it to the request object.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {function} next - The next middleware function.
 */
// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log(`Received Headers:`, req.headers);
  console.log(`Received Token:`, token);

  if (!token) {
    console.error('Unauthorized: Token missing');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Forbidden: Token verification error', err);
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;


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

router.post('/register', async (req, res) => {
  const userId = generateUserId();

  try {
    const userData = {
      id: userId,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    console.log('Creating a new user...');

    try {
      const newUser = await User.create(userData);

      console.log('New user created:', newUser);

      res.status(200).json({
        id: userId,
        username: req.body.username,
        message: 'User registered successfully',
      });
    } catch (error) {
      console.error('Error creating a new user:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!newUser) {
      console.error('Failed to create a new user');
      throw new Error('Failed to create a new user');
    }

    res.status(200).json({
      id: userId,
      username: req.body.username,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     summary: Login user
 *     tags: 
 *       - Users
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
          id: user.id,
          username: user.username,
          token: token,
          message: 'Successful login',
        });
      } else {
        return res.status(401).json({ message: 'Incorrect password!' });
      }
    } else {
      return res.status(401).json({ message: 'User not found!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
router.get('/:id', async (req, res) => {
  const userId = req.params.id.toString();

  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
router.put('/update/:id', async (req, res) => {
  const userId = req.params.id.toString();

  try {
    const user = await User.findById(userId);

    if (user) {
      user.username = req.body.username || user.username;
      user.password = req.body.password || user.password;
      user.email = req.body.email || user.email;

      await user.save();

      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
router.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id.toString();

  try {
    const user = await User.findById(userId);

    if (user) {
      await user.remove();
      res.status(200).json({ message: `User ${userId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
