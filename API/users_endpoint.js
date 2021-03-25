const users_DB = require('../Database/users_DB');
const jwt = require('jsonwebtoken');
const jwtpassword = 'Ac4m1c4_E$tUd14nT3s!';

const users_endpoint = (app) => {
  app.post('/', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    users_DB
      .findUser(username, password)
      .then((resp) => validate(resp))
      .catch((err) => console.error('Error: ', err));
    console.log(request.body);

    const validate = (result) => {
      console.log(result);
      if (result.length > 0) {
        let token = jwt.sign({ user: username }, jwtpassword, {
          expiresIn: 60000000000,
        });
        response.status(200).send({ token: token });
      } else {
        response.status(400).send({ error: 'User or password are wrong' });
      }
    };
  });

  app.post('/register', function (request, response) {
    let newUser = request.body;
    users_DB
      .createUser(newUser)
      .then((res) => response.status(201).send(res))
      .catch((err) => console.error('Error: ', err));
  });

  app.get('/', function (request, response) {
    let user = request.body.user;
    users_DB
      .getUserInfo(user)
      .then((resp) => validate(resp))
      .catch((err) => console.error('Error: ', err));

    const validate = (result) => {
      console.log(result);
      if (result.length > 0) {
        response.status(200).send(result);
      } else {
        response.status(400).send({ error: 'User not found' });
      }
    };
  });
};

module.exports = { users_endpoint };
