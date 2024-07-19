// index.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Enable CORS with specific origin
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Init Middleware
app.use(bodyParser.json());
app.use(helmet());

// Set CSP to allow images
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);

// Define Routes
app.use('/api/auth', require('./routes/auth')); // Make sure this path is correct
app.use('/api/notes', require('./routes/notes')); // Make sure this path is correct

// Define Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Notes App');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
