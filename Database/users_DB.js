const database = require('./database');

async function findUser(user, password) {
  let data;
  await database
    .query('SELECT * FROM users WHERE user = ? AND password = ?', {
      replacements: [user, password],
      type: database.QueryTypes.SELECT,
    })
    .then((resp) => (data = resp))
    .catch((err) => console.log(err));
  return data;
}

async function createUser(newUser) {
  await database.query(
    'INSERT INTO users (user, name, email, tel, address, password) VALUES (?,?,?,?,?,?)',
    {
      replacements: [
        newUser.user,
        newUser.name,
        newUser.email,
        newUser.tel,
        newUser.address,
        newUser.password,
      ],
    }
  );
  return { message: 'New user registered' };
}

async function getUserInfo(user) {
  let info = [];
  await database
    .query('SELECT * FROM users WHERE user = ?', {
      replacements: [user],
      type: database.QueryTypes.SELECT,
    })
    .then((resp) => (info = resp))
    .catch((err) => console.log(err));
  return info;
}

module.exports = { findUser, createUser, getUserInfo };
