const menu_DB = require('../Database/menu_DB');

const menu_endpoint = (app) => {
  app.get('/menu', function (req, res) {
    menu_DB
      .getMenu()
      .then((response) => res.status(200).send(response))
      .catch((err) => console.error('Error: ', err));
  });

  app.post('/menu', function (req, res) {
    let newProduct = req.body;
    menu_DB
      .insertProduct(newProduct)
      .then((response) => res.status(201).send(response))
      .catch((err) => console.error('Error: ', err));
  });

  app.put('/menu', function (req, res) {
    let product = req.body;
    menu_DB
      .editProduct(product)
      .then((response) => res.status(201).send(response))
      .catch((err) => console.error('Error: ', err));
  });

  app.delete('/menu', function (req, res) {
    let product = req.body;
    menu_DB
      .deleteProduct(product)
      .then((response) => res.status(200).send(response))
      .catch((err) => console.error('Error: ', err));
  });
};

module.exports = { menu_endpoint };
