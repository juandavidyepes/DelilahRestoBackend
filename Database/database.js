const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/delilahresto';
const database = new Sequelize(path);

database
  .authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Error de conexion:', err);
  });

module.exports = database;
