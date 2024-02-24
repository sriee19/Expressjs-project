const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// JWT Secret Key (Replace with your actual secret key)
const JWT_SECRET_KEY = 'sanjana123';

// Middleware to authenticate the token
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

    req.user = decoded; // Set decoded user object to req.user
    next();
  });
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API Documentation',
      version: '1.0.0',
      description: 'API for managing contacts in a contact manager application',
    },
  },
  apis: ['./routes/users.js', './routes/contacts.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes with JWT authentication
app.use('/users', require('./routes/users'));
app.use('/contacts', authenticateToken, require('./routes/contacts'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
