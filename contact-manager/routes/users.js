/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

const express = require('express');
const jwt = require(`jsonwebtoken`);
const router = express.Router();
const users = require('../data/users');

const JWT_SECRET_KEY = `sanjana123`;
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

router.post('/register', (req, res) => {
    const userId = generateUserId();
    const userData = {
        id: userId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    users.push(userData);
    // console.log('All registered users:', users);

    res.status(200).json({
        id: userId,
        username: req.body.username,  
        message: 'User registered successfully',
    });
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
    // console.log('Received credentials:', username, password);
    // console.log('All registered users:', users);
    const user = users.find(u => u.username === username && u.password === password);
    // console.log('Matching user:', user);
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
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// const users = [];

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
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.get('/:id', (req, res) => {
    const userId = req.params.id.toString();
    // console.log(`Requested User id:`, userId);
    // console.log('All registered users:', users); 
    const user = users.find((user) => user.id === userId);
  
    if (user) {
        // console.log('Found user:', user);
      res.status(200).json(user);
    } else {
        // console.log('User not found');
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
 *           type: integer
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
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.put('/update/:id', (req, res) => {
const userId = req.params.id.toString();
//  console.log(`Requested User id:`, userId);
    // console.log('All registered users:', users); 
const userIndex = users.findIndex((user)=>user.id===userId);

if(userIndex !== -1){
    users[userIndex].username = req.body.username || users[userIndex].username;
    users[userIndex].password = req.body.password || users[userIndex].password;
    users[userIndex].email = req.body.email || users[userIndex].email;

    res.status(200).json(users[userIndex]);
    //  console.log('Found user:', users);
} else{
    res.status(404).json({message: `User not found`});
    //   console.log('User not found');
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
 *           type: integer
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
//  console.log(`Requested User id:`, userId);
    // console.log('All registered users:', users); 
const userIndex = users.findIndex((user)=>user.id===userId);

if(userIndex !== -1){
    const deleteUser = users.splice(userIndex, 1);
    res.status(200).json({message:`User ${userId} deleted successfully`,deleteUser});
 //  console.log('Found user:', users);
} else{
    res.status(404).json({message:`User not found`});
        //   console.log('User not found');
}
});
// console.log('Loaded route file: users.js');

module.exports = router;
