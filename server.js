const express = require('express'); // variable express wnat to get an express server up and running

const app = express(); // create an instance of express

app.get('/', (req, res) => res.send('API Running')); // create a route for the root URL that sends back a message

const PORT = process.env.PORT || 3000; // look for an env var called port to use and when deployed heroku gets port from env var with default 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // listen on the port and log a message when server starts
