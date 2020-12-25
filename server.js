const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const api = require('../server/app/service/file')

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use('/public', express.static('public'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configuring the database
const dbConfig = require('./app/config/db.config');

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

require('./app/routes/user.route')(app);

app.use('/api', api)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});