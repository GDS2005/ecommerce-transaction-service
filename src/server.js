const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Load environment variables from a .env file into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Connect to the MongoDB database
db();

// Set up Morgan to log requests
app.use(morgan('dev')); //Set up Morgan to log requests

// Parse incoming JSON requests
app.use(express.json());

// Handle requests from different origins with CORS
app.use(cors());

// Secure the app by setting various HTTP headers
app.use(helmet());

// v1 API routes
app.use('/v1', require('./routes/v1/'));

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Error-handling middleware
app.use(error);

// Set the port for the server to listen on, using the value from environment variables or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port, logging a message to the console when it starts
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));