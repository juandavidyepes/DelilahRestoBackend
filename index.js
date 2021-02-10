const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const app = express();

const { users, foodMenu } = require('./data');
const { response } = require('express');

const jwtpassword = 'Ac4m1c4_E$tUd14nT3s!';

app.use(express.json());
app.use(cors());
app.use(expressJwt({ secret: jwtpassword }).unless({ path: ['/login'] }));

app.get('/foodmenu', function (req, res) {
  res.status(200).send(foodMenu);
});

app.post('/login', function (request, response) {
  console.log(request.body);
  console.log(users);
  if (
    users.some((e) => e.username === request.body.username) &&
    users.some((e) => e.password === request.body.password)
  ) {
    let token = jwt.sign({ user: users.username }, jwtpassword, {
      expiresIn: 60,
    });
    response.status(200).send({ token: token });
  } else {
    response.status(418).send({ error: 'user or password are wrong' });
  }
});

app.listen(3001, function () {
  console.log('Delilah Resto port 3001');
});
