// connection to the database will be handled here in the future
// it can be implemented in server.js but it'll be cleaner to have it in a separate file

const mongoose = require('mongoose');
const config = require('config'); // to get the db config from default.json
const db = config.get('mongoURI'); // get the value of mongoURI from default.json

const connectdb = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1); // exit process with failure
  }
}; // whenever async await -> try catch block to handle errors

module.exports = connectdb; // export the function to be used in server.js
