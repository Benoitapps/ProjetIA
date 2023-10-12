const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.env.local', override: true });

const adminRoutes = require('./routes/admin');
const GenericController = require("./controllers/generic");
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');

const { connect } = require('./services/mongoose');
const { connectpg } = require('./db/');



const app = express();
const sequelize = require('sequelize')

// Use to allow cross-origin requests
app.use(cors({
  origin: [`${process.env.URL}:${process.env.PORT_FRONT}`, 'http://162.19.79.79:8080/'],
  credentials : true,
}));

//cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use("/", userRoutes)
app.use("/connecter", homeRoutes)
app.use("/admin", adminRoutes)

const port = process.env.PORT_BACK;
const hostname = process.env.DOMAIN_NAME;

app.listen(port, hostname, () => {
   console.log(`Server running at ${hostname}:${port}/`);

  if (process.env.NODE_ENV !== 'test') connect();
});

module.exports = app;