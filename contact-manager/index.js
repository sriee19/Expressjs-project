const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require(`./swagger`);

const app = express();


const myswaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(myswaggerSpec));

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.yuqtc0x.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
});
console.log("Connection sucessful")


const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

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
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./routes/users.js', './routes/contacts.js'],
};

const swaggerSpec = swaggerJsdoc(options);
// console.log(JSON.stringify(swaggerSpec, null, 2));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes with JWT authentication
app.use('/users', require('./routes/users'));
app.use('/contacts', authenticateToken, require('./routes/contacts'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
