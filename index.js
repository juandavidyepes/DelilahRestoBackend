const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const app = express();
const { response } = require('express');
// const { users } = require('./data');

const jwtpassword = 'Ac4m1c4_E$tUd14nT3s!';

app.use(express.json());
app.use(cors());
app.use(
  expressJwt({ secret: jwtpassword }).unless({ path: ['/', '/register'] })
);

const { users_endpoint } = require('./API/users_endpoint');
users_endpoint(app);

const { menu_endpoint } = require('./API/menu_endpoint');
menu_endpoint(app);

app.listen(3001, function () {
  console.log('Delilah Resto port 3001');
});
