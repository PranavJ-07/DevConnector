require('dotenv').config();
const express = require('express'); // variable express want to get an express server up and running
const connectdb = require('./config/db'); // import the connectdb function from config/db.js

const app = express(); // create an instance of express

// connect to databse;
connectdb(); // call the function to connect to the database

// init middleware
app.use(express.json({ extended: false })); // to parse incoming request bodies in a middleware before your handlers, available under the req.body property
// to get data from body we use this middleware

// define routes
app.use('/api/users', require('./routes/api/users')); // use the users route for /api/users endpoint
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/', (req, res) => res.send('API Running')); // create a route for the root URL that sends back a message

const PORT = process.env.PORT || 7000; // look for an env var called port to use and when deployed heroku gets port from env var with default 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // listen on the port and log a message when server starts
